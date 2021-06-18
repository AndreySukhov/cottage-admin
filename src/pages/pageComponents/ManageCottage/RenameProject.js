import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import cc from "classcat";

import Input from "../../../components/form/Input";
import {ReactComponent as Check} from "../../../assets/icons/check.svg";
import Button from "../../../components/form/Button";
import api from "../../../api";

import style from "./style.module.css";

const RenameProject = ({cottage, onSuccess}) => {
  const [name, setName] = useState(cottage?.name || '')
  console.log(cottage, 'cottage')

  const handleSave = () => {
    api.put(`Project/update/${cottage.id}`, {
      name,
      description: cottage.description,
      price: cottage.price,
      files: cottage.files
    }).then((res) => {
      onSuccess({
        ...cottage,
        name
      })
    })
  }

  return (
    <OutsideClickHandler >
      <div className={style['list-row']} >
        <div className={style['list-row-value']}>
          <Input value={name} fw autoFocus onChange={(e) => setName(e.target.value)} />
        </div>
        <Button
          className={`button-clear-style ${style['side-btn']}`}
          onClick={handleSave}>
          <Check />
        </Button>
      </div>
    </OutsideClickHandler>
  )
}

export default RenameProject
