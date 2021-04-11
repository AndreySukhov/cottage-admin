import React, { useState } from 'react'
import Button from "../../../components/form/Button";
import TextBlock from "../../../components/typography/TextBlock";
import PropTypes from 'prop-types';

import Preloader from "../../../components/Preloader";
import SubmitRow from '../../../components/form/SubmitRow';

import api from '../../../api';

import style from './style.module.css'

import {ReactComponent as RefreshEmpty} from "../../../assets/icons/refresh-empty.svg";

const ResetPassword = ({ email, onCancel }) => {

  const [status, setStatus] = useState('initial');

  const sendRequest = () => {
    setStatus('pending')
    console.log(window.location, 'window.location')

    api.post('Users/restore-password', {
      email,
      callBackUrl: `${window.location.origin}/reset-password`
    })
      .then(() => {
        setStatus('success')
      })
      .catch(() => {
        setStatus('error')
      })

  }

  if (status === 'success') {
    return (
      <div className={style.wrap}>
        <TextBlock size={'l'}>
          Ссылка отправлена на указанную почту
        </TextBlock>
        <Button onClick={onCancel}>
          закрыть
        </Button>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className={style.wrap}>
        <TextBlock size={'l'}>
          произошла ошибка, попробуйте позже
        </TextBlock>
        <Button onClick={onCancel}>
          закрыть
        </Button>
      </div>
    )
  }

  return (
    <div className={style.wrap}>
      <div className={style.textWrap}>
        <TextBlock size={'l'}>
          Ссылка для восстановления пароля будет отправлена на почту <strong>{email}</strong>
        </TextBlock>
      </div>
      {status === 'pending' && (<Preloader />)}
      {status === 'initial' && (
        <SubmitRow align="space-around">
          <Button onClick={sendRequest}>
            Да, сбросить пароль
          </Button>
          <Button
            view={'text'}
            onClick={onCancel}
            icon={<RefreshEmpty />}
          >
            Назад
          </Button>
        </SubmitRow>
      )}
    </div>
  )
}

ResetPassword.propTypes = {
  email: PropTypes.string,
  onCancel: PropTypes.func
}

export default ResetPassword
