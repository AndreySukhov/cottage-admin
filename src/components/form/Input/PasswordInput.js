import React, { useState } from 'react';
import Input from './index';

import style from './style.module.css';

import {ReactComponent as EyeOpened} from '../../../assets/icons/eye-opened.svg';
import {ReactComponent as EyeClosed} from '../../../assets/icons/eye-closed.svg';


const PasswordInput = (props) => {
  const [ passVisible, setPassvisible ] = useState(false);

  return (
    <Input
      type={passVisible ? 'text' : 'password'}
      {...props}
      rightAddon={() => {
        return (
          <button type="button" onClick={() => setPassvisible(!passVisible)}
            className={style['toggle-pass-icon']}>
            <div className={style['toggle-visibility-icon']}>
              {passVisible ? <EyeOpened /> : <EyeClosed />}
            </div>
          </button>
        );
      }}
    />
  );
};

export default PasswordInput;
