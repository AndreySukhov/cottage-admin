import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classcat';
import style from './style.module.css';
import {
  Link
} from 'react-router-dom';

const Button = ({
  children,
  className,
  disabled,
  fw,
  view,
  type,
  icon,
  to,
  ...props
}) => {

  if (to) {
    return (
      <Link
        to={to}
        disabled={disabled}
        className={cc([style.button, style[`button-${view}`], className, {
          [style['button-fw']]: fw
        }])}
        {...props}>
        {icon && (
          <div className={style.icon}>
            {icon}
          </div>
        )}
        { children }
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      type={type}
      className={cc([style.button, style[`button-${view}`], className, {
        [style['button-fw']]: fw
      }])}
      {...props}>
      {icon && (
        <div className={style.icon}>
          {icon}
        </div>
      )}
      { children }
    </button>
  );
};

Button.defaultProps = {
  fw: false,
  size: 'm',
  view: 'primary',
  type: 'button',
  to: ''
};

Button.propTypes = {
  className: PropTypes.string,
  fw: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  view: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Button;
