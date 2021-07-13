import React, {useState} from 'react';
import style from '../style.module.css';
import Input from '../../../components/form/Input';
import Button from '../../../components/form/Button';
import FormRow from '../../../components/form/FormRow';


const SetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState('');
  return (
    <>
      <FormRow>
        <Input
          placeholder="пароль"
          value={password}
          fw
          onChange={(e) => setPassword(e.target.value)}
          type='password'
        />
      </FormRow>
      <FormRow>
        <div className={style['form-item']}>
          <Button disabled={pending}>
            Сохранить пароль
          </Button>
        </div>
      </FormRow>
    </>
  );
};

export default SetPasswordForm;
