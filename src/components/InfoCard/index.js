import React from 'react';

import TextBlock from '../typography/TextBlock';

import style from './style.module.css';

import {ReactComponent as Bin} from "../../assets/icons/bin.svg";


const InfoCard = ({
  onClick = () => {},
  onRemove,
  children,
  rightAside
}) => {
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
          {onRemove && (
            <div className={style['remove']}>
              <button
                type="button"
                className={style['remove-btn']}
                onClick={onRemove}
              >
                <Bin />
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default InfoCard;
