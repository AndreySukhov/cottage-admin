import React, { Children } from 'react';

import style from './style.module.css'

const SubmitRow = ({ align = 'center', children }) => {
  return (
    <div className={`${style['submit-row']} ${style[`${align}`]}`}>
      {Children.map(children.filter((c) => !!c), (child, i) => {
        return (
          <div className={style['submit-row-item']} key={i}>
            {child}
          </div>
        )
      })}
    </div>
  )
}

export default SubmitRow;
