import React, {useState, useEffect} from 'react';
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

import AddUserForm from './AddUserForm'

import api from '../../api'
import {httpErrorCodeToMessage} from "../../utils";

import style from './style.module.css'
import ResetPassword from "../Auth/ResetPassword";
import {ReactComponent as RefreshEmpty} from "../../assets/icons/refresh-empty.svg";

const ManageUsers = () => {

  const [status, setStatus] = useState('pending');
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState(false);
  const [removeUserData, setRemoveUserData] = useState(null);

  const getUsers = () => {
    setStatus('pending')
    api.get('/api/v1/Users').then((res) => {
      console.log(res)
    })
      .catch((e) => {
        console.log(e)
        toast.error(httpErrorCodeToMessage());
      })

    setUsers([
      {
        "id": 0,
        "email": "string",
        "role": "Admin",
        type: 'current'
      }
    ])
    setStatus('success')
  }

  const removeUser = ({id, type}) => {

    if (type === 'new') {
      setNewUsers(newUsers.filter((user) => user.id !== id));
      return
    }

    api.delete(`/api/v1/Users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
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
            onAdd={({email, role}) => {
              setNewUsers([...newUsers, {
                email,
                role,
                type: 'new',
                id: new Date().getTime()
              }])
            }}
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
                removeUser({id: removeUserData.id, type: removeUserData.type, email: removeUserData.email})
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
        <form>
          <div className={style['inputs-wrap']}>
            {[...users, ...newUsers].map((user) => {
              return (
                <div className={style['form-item-grid']} key={user.id}>
                  <div className={style['form-item-input']}>
                    <Input value={user.email} readOnly fw type='email'/>
                  </div>
                  <div className={style['form-item-select']}>
                    <Input value={user.role} readOnly fw/>
                  </div>
                  <div className={style.aside}>
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
                    <div className={style['aside-row']}>
                      <button
                        onClick={() => setRemoveUserData(user)}
                        disabled={formPending}
                        type="button"
                        className={cc(['button-clear-style', style['aside-row-btn'], style['aside-row-btn--delete']])}>
                        удалить
                      </button>
                    </div>
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
          </div>
          <SubmitRow>
            <Button type={'submit'} disabled={formPending}>
              Сохранить
            </Button>
            <Button to={'/'} view={'text'}>
              На главную
            </Button>
          </SubmitRow>
        </form>
      </div>
    </div>
  )
}

export default ManageUsers
