import React from 'react';
import {Formik} from 'formik';

import Input from '../../../components/form/Input';
import Button from '../../../components/form/Button';
import SubmitRow from '../../../components/form/SubmitRow';
import FormRow from '../../../components/form/FormRow'
import FileUpload from '../../../components/form/FileUpload'

import {ReactComponent as Refresh} from "../../../assets/icons/refresh.svg";

const BaseInfo = ({onExit}) => {
  return (
    <div>
      <Formik
        initialValues={{description: '', price: ''}}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
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
