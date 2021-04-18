import React, { useState } from 'react';
import {Formik} from 'formik';
import {toast} from "react-toastify";
import {
  useHistory
} from 'react-router-dom';

import api from '../../../api'
import Input from '../../../components/form/Input';
import Button from '../../../components/form/Button';
import SubmitRow from '../../../components/form/SubmitRow';
import FormRow from '../../../components/form/FormRow'
import FileUpload from '../../../components/form/FileUpload'

import {ReactComponent as Refresh} from "../../../assets/icons/refresh.svg";
import {httpErrorCodeToMessage} from "../../../utils";

const BaseInfo = ({onExit, onSuccess, projectId, data = { }}) => {
  const [fileIds, setFileIds] = useState([])
  const history = useHistory()

  return (
    <div>
      <Formik
        initialValues={{
          description: data.description || '',
          price: data.price || '',
          name: data.name || '',
        }}
        onSubmit={({name, description, price}, {setSubmitting}) => {

          let method = 'post'
          let url = 'Project/create'

          if (projectId) {
            method = 'put'
            url = `Project/update/${projectId}`
          }

          api[method](url, {
            name,
            description,
            price,
            files: fileIds
          }).then((res) => {
            history.push(`/cottageForm/${res.data.data.id}`)
            onSuccess({
              name,
              description,
              price,
              files: fileIds
            })
            setSubmitting(false);
          }).catch((e) => {
            console.error(e)
            toast.error(httpErrorCodeToMessage());
            setSubmitting(false);
          })
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormRow>
              <Input
                fw
                placeholder={'Название'}
                name="name"
                onChange={handleChange}
                value={values.name}
              />
            </FormRow>
            <FormRow>
              <Input
                fw
                textarea
                placeholder={'Описание'}
                name="description"
                onChange={handleChange}
                value={values.description}
              />
            </FormRow>
            <FormRow>
              <FileUpload
                options={{
                  accept: 'image/jpeg, image/png',
                  maxFiles:5
                }}
                defaultFiles={data.files || []}
                onSuccess={(fileIds) => {
                  setFileIds(fileIds)
                }}
                previewText={'Перетащите сюда файлы строительной документации документации'}/>
            </FormRow>
            <FormRow>
              <Input
                fw
                name="price"
                placeholder={'Цена'}
                type={'number'}
                onChange={handleChange}
                value={values.price}
              />
            </FormRow>
            <SubmitRow>
              <Button type={'submit'} disabled={isSubmitting}>
                Сохранить
              </Button>
              <Button view={'text'} type={'button'} onClick={onExit} icon={<Refresh />}>
                Отменить
              </Button>
            </SubmitRow>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default BaseInfo
