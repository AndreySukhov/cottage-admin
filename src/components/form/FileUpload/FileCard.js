import React from 'react';
import {ReactComponent as Bin} from '../../../assets/icons/bin.svg';

import style from './style.module.css';

const FileCard = ({name, id, handleRemove}) => {
  return (
    <div className={style['file-card']}>
      {name}
      <button
        type="button"
        className={style['file-delete']}
        onClick={() => handleRemove(id)}
      >
        <Bin />
      </button>
    </div>
  );
};

export default FileCard;
