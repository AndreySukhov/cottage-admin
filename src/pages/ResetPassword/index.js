import React, { useContext, useState, useEffect } from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {toast} from "react-toastify";

import { AppContext } from '../../App'
import Heading from "../../components/typography/Heading";
import PasswordInput from "../../components/form/Input/PasswordInput";
import SubmitRow from "../../components/form/SubmitRow";
import Button from "../../components/form/Button";

import {httpErrorCodeToMessage} from "../../utils";
import api from '../../api';

import style from './style.module.css';

const ResetPassword = () => {
  const { accessToken, handleAuthState } = useContext(AppContext);
  const location = useLocation()
  const history = useHistory();

  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [pending, setPending] = useState(false)


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token')
    const email = params.get('email')

    if (!token || !email) {
      history.push('/');
      return
    }

    if (accessToken) {
      handleAuthState(null)
    }
  }, [accessToken])

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(location.search);
    const token = params.get('token')
    const email = params.get('email')

    api.post(`Users/reset-password?token=${token}&email=${email}`, {
      password,
      confirmPassword,
    }).then(() => {
      history.push('/');
      toast.success('Пароль сброшен, пройдите авторизацию');
    }).catch((e) => {
      console.error(e)
      toast.error(httpErrorCodeToMessage());
    })
  }

  const allowedToSubmit = password.length && confirmPassword.length && password === confirmPassword;

  return (
    <div className={style.wrap}>
      <div>
        <Heading>
          Восстановление пароля
        </Heading>
        <form className={style.form} onSubmit={handleSubmit} autoComplete="off">
          <div className={style['input-wrap']}>
            <PasswordInput
              value={password}
              fw
              wrapClass={style['input-row']}
              disabled={pending}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <PasswordInput
              value={confirmPassword}
              disabled={pending}
              fw
              wrapClass={style['input-row']}
              onChange={(e) => {
                setconfirmPassword(e.target.value);
              }}
            />
          </div>
          <SubmitRow>
            <Button disabled={!allowedToSubmit || pending} type="submit">
              Восстановить
            </Button>
            <Button
              view={'text'}
              to={'/'}
            >
              я вспомнил пароль
            </Button>
          </SubmitRow>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword;
