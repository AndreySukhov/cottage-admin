import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classcat';

import style from './style.module.css';

const Input = ({
  type, onChange,
  fw = false,
  textarea = false,
  className,
  wrapClass,
  rightAddon = null,
  ...props
}) => {

  let Component = 'input'

  if (textarea) {
    Component = 'textarea'
  }

  return (
    <div className={cc([style.wrap, wrapClass, {
      [style.fw]: fw
    }])}>
      <Component
        type={type}
        className={cc([style.input, className, {
          [style['input-fw']]: fw,
          [style['with-right-addon']]: !!rightAddon,
          [style['textarea']]: textarea,
        }])}
        onChange={onChange}
        {...props}
      />
      {rightAddon && (
        <div className={style['right-addon']}>
          {rightAddon()}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  wrapClass: PropTypes.string,

  fw: PropTypes.bool,

  rightAddon: PropTypes.func,
  onChange: PropTypes.func,
};

export default Input;
