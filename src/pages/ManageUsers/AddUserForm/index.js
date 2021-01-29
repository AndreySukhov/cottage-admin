import React, { useState } from 'react';

import Input from '../../../components/form/Input';
import Button from '../../../components/form/Button';
import SubmitRow from '../../../components/form/SubmitRow';
import FormRow from '../../../components/form/FormRow'
import SelectInput from '../../../components/form/SelectInput';

import { USER_ROLES } from '../../../utils'

import {ReactComponent as Refresh} from '../../../assets/icons/refresh.svg';

const AddUserForm = ({ onAdd, onCancel }) => {

  const [email, setEmail] = useState('')
  const [role, setRole] = useState({})

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        onAdd({
          email,
          role: role?.value
        })
        onCancel()
      }}>
        <FormRow>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            fw
          />
        </FormRow>
        <FormRow>
          <SelectInput onChange={setRole} selectedOption={role} options={USER_ROLES} />
        </FormRow>
        <SubmitRow>
          <Button type={'submit'} disabled={!email.trim().length || !role?.value}>
            Сохранить
          </Button>
          <Button onClick={onCancel} view={'text'} icon={<Refresh />}>
            Отменить
          </Button>
        </SubmitRow>
      </form>
    </div>
  )
}
export default AddUserForm
