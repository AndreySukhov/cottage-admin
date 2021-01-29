import React from 'react';
import {Formik} from 'formik';

import Input from '../../../components/form/Input';
import Button from '../../../components/form/Button';
import SubmitRow from '../../../components/form/SubmitRow';
import FormRow from '../../../components/form/FormRow'
import FileUpload from '../../../components/form/FileUpload'

import {ReactComponent as Refresh} from "../../../assets/icons/refresh.svg";

const Configuration = ({onExit}) => {
  return (
    <div>
      <Formik
        initialValues={{
          constructive: '',
          description: '',
          name: '',
          price: '',
          vendorCode: ''
        }}
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
                placeholder={'Конструктив'}
                name="constructive"
                onChange={handleChange}
                value={values.constructive}
              />
            </FormRow>
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
                name="price"
                placeholder={'Цена'}
                type={'number'}
                onChange={handleChange}
                value={values.price}
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
                previewText={'изображение'}/>
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
            <FormRow>
              <Input
                fw
                name="vendorCode"
                placeholder={'Артикул'}
                type={'number'}
                onChange={handleChange}
                value={values.vendorCode}
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

export default Configuration
