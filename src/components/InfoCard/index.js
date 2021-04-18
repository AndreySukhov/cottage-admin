import React from 'react';

import TextBlock from "../typography/TextBlock";

import style from './style.module.css'


const InfoCard = ({onClick = () => {}, children, rightAside}) => {
  return(
    <div className={style.wrap}>
      <div className={style.content}>
        <button
          className={style.btn}
          type="button"
          onClick={onClick}
        >
          ...
        </button>
        <div className={style.body}>
          <TextBlock>
            <div className={style.text}>
              {children}
            </div>
          </TextBlock>
        </div>
        <div className={style.rightAside}>
          <strong>
            {rightAside}
          </strong>
        </div>
      </div>

    </div>
  )
}

export default InfoCard
