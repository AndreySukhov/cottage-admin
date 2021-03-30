import React, {useState, useEffect, useContext} from 'react';
import {Helmet} from 'react-helmet';
import {toast} from "react-toastify";
import cc from 'classcat'

import Preloader from '../../components/Preloader'
import Input from '../../components/form/Input';
import Button from '../../components/form/Button';
import SubmitRow from '../../components/form/SubmitRow';
import Modal from "../../components/Modal";
import Heading from "../../components/typography/Heading";
import TextBlock from "../../components/typography/TextBlock";
import SelectInput from "../../components/form/SelectInput";
import ResetPassword from "../Auth/ResetPassword";
import AddUserForm from './AddUserForm'

import {AppContext} from "../../App";
import api from '../../api'
import {httpErrorCodeToMessage} from "../../utils";
import {USER_ROLES_ARRAY, USER_ROLES} from "../../utils/constants";

import style from './style.module.css'

import {ReactComponent as RefreshEmpty} from "../../assets/icons/refresh-empty.svg";
import SetPasswordForm from "./SetPasswordForm";

const ManageUsers = () => {

  const [status, setStatus] = useState('pending');
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState(false);
  const [removeUserData, setRemoveUserData] = useState(null);

  const context = useContext(AppContext);


  const getUsers = () => {
    setStatus('pending')
    api.get('/Users').then(({data}) => {
      setUsers(data.data.map((user) => {
        return {
          ...user,
          type: 'current'
        }
      }))
    })
      .catch((e) => {
        console.error(e)
        toast.error(httpErrorCodeToMessage());
      })
    setStatus('success')
  }

  const handleRemoveUser = (id) => {
    api.delete(`/Users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        setRemoveUserData(null)
        toast.success('Пользователь удален');
      }).catch((e) => {
      console.error(e)
      toast.error(httpErrorCodeToMessage());
    })
  }

  const handleAddUser = async ({email, role}) => {
    setStatus('userPending')
    try {
      const res = await api.post('/Users', {
        email,
        role
      })
      setRemoveUserData(null)
      setUsers([...users, res.data.data])
      toast.success('Пользователь добавлен');

    } catch (e) {
      console.error(e)
      toast.error(httpErrorCodeToMessage());
    }
    setStatus('success')
  }

  const updateRole = async (id, role) => {
    api.put(`/Users/${id}`, {
      role,
    }).then((res) => {
      const newUserData = res?.data?.data;
      setUsers(users.map((user) => {
        if (user.id === newUserData.id) {
          return newUserData
        }
        return user
      }))
    }).catch((e) => {
      console.error(e)
      toast.error(httpErrorCodeToMessage());
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  const formPending = status === 'formPending'

  if (status === 'pending') {
    return (
      <div className={style.wrap}>
        <Preloader/>
      </div>
    )
  }

  return (
    <div className={style.wrap}>
      <Helmet>
        <title>Управление пользователями</title>
      </Helmet>
      <Heading>
        Тут можно дать доступ другим членам команды
      </Heading>
      {modalVisible && (
        <Modal
          isOpen={true}
          onExit={() => setModalVisible(false)}>
          <AddUserForm
            onAdd={handleAddUser}
            onCancel={() => setModalVisible(false)}/>
        </Modal>
      )}
      {resetEmail && (
        <Modal
          className="popup-restore-pass"
          isOpen={true}
          onExit={() => setResetEmail('')}>
          <ResetPassword email={resetEmail} onCancel={() => setResetEmail('')}/>
        </Modal>
      )}
      {removeUserData && (
        <Modal
          className="popup-restore-pass"
          isOpen={true}
          onExit={() => setRemoveUserData(null)}>
          <>
            <TextBlock size={'l'} tc>
              Точно удалить пользователя <strong>{removeUserData.email}</strong> ?
            </TextBlock>
            <br/>
            <br/>
            <br/>
            <SubmitRow align="space-around">
              <Button onClick={() => {
                handleRemoveUser(removeUserData.id)
              }}>
                Да, удалить
              </Button>
              <Button
                view={'text'}
                onClick={() => setRemoveUserData(null)}
                icon={<RefreshEmpty/>}
              >
                Назад
              </Button>
            </SubmitRow>
          </>
        </Modal>
      )}
      <div className={style['form-wrap']}>
        <div className={style['inputs-wrap']}>
          {users.map((user) => {

            const isSameUser = user.id === context?.user?.id

            return (
              <div className={style['form-item-grid']} key={user.id}>
                <div className={style['form-item-input']}>
                  <Input value={user.email} readOnly fw type='email'/>
                </div>
                <div className={style['form-item-select']}>
                  {isSameUser
                    ? (<Input value={user.role} readOnly fw/>)
                    : (
                      <SelectInput
                        onChange={(val) => {
                          updateRole(user.id, val.value)
                        }}
                        selectedOption={{
                          value: user.role, label: USER_ROLES[user.role].label
                        }}
                        options={USER_ROLES_ARRAY}
                      />
                    )
                  }
                </div>
                <div className={style.aside}>

                  <>
                    <div className={style['aside-row']}>
                      <button
                        disabled={formPending}
                        onClick={() => {
                          setResetEmail(user.email)
                        }}
                        type="button"
                        className={cc(['button-clear-style', style['aside-row-btn'], style['aside-row-btn--reset']])}
                      >
                        сбросить пароль
                      </button>
                    </div>
                    {!isSameUser && context.user.role === USER_ROLES.Admin.value && (
                      <div className={style['aside-row']}>
                        <button
                          onClick={() => setRemoveUserData(user)}
                          disabled={formPending}
                          type="button"
                          className={cc(['button-clear-style', style['aside-row-btn'], style['aside-row-btn--delete']])}>
                          удалить
                        </button>
                      </div>
                    )}
                  </>
                </div>
              </div>
            )
          })}
          <div className={style['form-item']}>
            <Button
              view={'add'}
              type={'button'}
              fw
              disabled={formPending}
              onClick={() => {
                setModalVisible(true)
              }}
            >
              + Добавить пользователя
            </Button>
          </div>
          {status === 'userPending' && (
            <Preloader />
          )}
        </div>
        <br/>
        <SetPasswordForm />
      </div>
    </div>
  )
}

export default ManageUsers
