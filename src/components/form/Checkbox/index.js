import React from 'react';

import style from './styles.module.css'
import {ReactComponent as Arrow} from './accordeon-arrow.svg';

const CheckBox = ({
  checked,
  disabled,
  onChange,
  ...props
}) => {
  return (
    <label className={style['choice-wrap']}>
      <input
        className={style['input']}
        type="checkbox"
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        {...props} />
      <div className={style['choice-faker']} >
        <div className={style['choice-faker-img']}>
          <Arrow />
        </div>
      </div>
    </label>
  )
}

export default CheckBox
