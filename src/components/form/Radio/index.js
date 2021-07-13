import React from 'react';

import style from './styles.module.css'

const Radio = ({
  checked,
  disabled,
  onChange = () => {},
  ...props
}) => {
  return (
    <label className={style['choice-wrap']}>
      <input
        className={style['input']}
        type="radio"
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        {...props} />
      <div className={style['choice-faker']} >
        <div className={style['choice-faker-content']} />
      </div>
    </label>
  )
}

export default Radio
