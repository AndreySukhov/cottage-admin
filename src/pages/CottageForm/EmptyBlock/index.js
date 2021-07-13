import React from 'react';
import cc from 'classcat';

import TextBlock from '../../../components/typography/TextBlock';

import style from './style.module.css';

const EmptyBlock = ({ text, onClick = () => {} }) => {
  return (
    <button
      className={cc(['button-clear-style', style.wrap])}
      onClick={onClick}>
      <div className={style['text-wrap']}>
        <TextBlock>
          {text}
        </TextBlock>
      </div>
      <div className={style['plus']}>
        +
      </div>
    </button>
  );
};

export default EmptyBlock;
