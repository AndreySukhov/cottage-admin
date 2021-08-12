import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Heading from '../../components/typography/Heading';
import Input from '../../components/form/Input';
import PasswordInput from '../../components/form/Input/PasswordInput';
import Button from '../../components/form/Button';
import SubmitRow from '../../components/form/SubmitRow';
import Modal from '../../components/Modal';

import ResetPassword from './ResetPassword';
import api from '../../api';
import { httpErrorCodeToMessage } from '../../utils/index';

import style from './style.module.css';

import {ReactComponent as Refresh} from '../../assets/icons/refresh.svg';


const Auth = ({handleAuthState}) => {

  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetModalVisible, setResetModalVisible] = useState(false);
  console.log('test')

  const allowSubmit = email.trim().length && password.trim().length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);

    try {
      const res = await api.post('Users/login',{
        email,
        password
      });

      if (res?.data?.data?.accessToken) {
        handleAuthState(res.data.data.accessToken);
      } else {
        httpErrorCodeToMessage(e?.response?.status);
      }
    } catch (e) {
      setPending(false);
      toast.error(e?.response?.data?.meta?.message || httpErrorCodeToMessage(e?.response?.status));
    }
  };

  return (
    <div className={style.wrap}>
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <div>
        <Heading>
          Привет! Это админка конфигуратора коттеджей
        </Heading>
        {resetModalVisible && (
          <Modal
            className="popup-restore-pass"
            isOpen={true}
            onExit={() => setResetModalVisible(false)}>
            <ResetPassword email={email} onCancel={() => setResetModalVisible(false)} />
          </Modal>
        )}
        <form className={style.form} onSubmit={handleSubmit} autoComplete="off">
          <input autoComplete="false" name="hidden" type="text" style={{display: 'none'}} />
          <div className={style['input-wrap']}>
            <Input
              value={email}
              type={'email'}
              fw
              wrapClass={style['input-row']}
              disabled={pending}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <PasswordInput
              value={password}
              disabled={pending}
              fw
              wrapClass={style['input-row']}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <SubmitRow>
            <Button disabled={!allowSubmit || pending} type="submit">
              Войти
            </Button>
            <Button
              view={'text'}
              onClick={() => setResetModalVisible(true)}
              disabled={pending || !email.trim().length} icon={<Refresh />}>
              сбросить пароль
            </Button>
          </SubmitRow>
        </form>
      </div>
    </div>
  );
};

Auth.propTypes = {
  handleAuthState: PropTypes.func,
};

export default Auth;
