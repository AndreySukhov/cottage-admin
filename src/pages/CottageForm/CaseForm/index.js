import React, { useState } from 'react';
import {Formik} from 'formik';
import api from '../../../api';
import {toast} from 'react-toastify';
import {httpErrorCodeToMessage} from '../../../utils';
import FormRow from '../../../components/form/FormRow';
import Input from '../../../components/form/Input';
import Button from '../../../components/form/Button';
import FileUpload from '../../../components/form/FileUpload';


const CasesForm = ({
 caseData,
 onSuccess
}) => {

  const [filesIds, setFilesIs] = useState([])

  return (
    <Formik
      initialValues={{
        name: caseData?.name,
        code: caseData?.code,
        price: caseData?.price
      }}
      onSubmit={(values, {setSubmitting}) => {
        if (!values.price) {
          toast.error('Необходимо установить цену');
          return false;
        }
        setSubmitting(true);

        let method = 'post';
        let url = 'Cases/create';

        if (caseData?.id) {
          method = 'put';
          url = `Cases/update/${caseData.id}`;
        }

        api[method](url, {
          name: values.name,
          code: values.code,
          price: values.price,
          optionId: caseData.optionId,
          files: filesIds
        }).then((res) => {
          onSuccess(res.data.data);
          setSubmitting(false);
        }).catch((e) => {
          toast.error(e?.response?.data?.meta?.message || httpErrorCodeToMessage(e?.response?.status));
          setSubmitting(false);
        });
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
              placeholder={'Название варианта опции'}
              name="name"
              onChange={handleChange}
              value={values.name}
            />
          </FormRow>
          <FormRow>
            <FileUpload
              options={{
                accept: 'image/jpeg, image/png',
                maxFiles:5
              }}
              defaultFiles={filesIds}
              onSuccess={(fileIds) => {
                setFilesIs(fileIds)
              }}
              previewText={'Перетащите сюда файлы варианта опций'}/>
          </FormRow>
          <FormRow>
            <Input
              fw
              placeholder={'Цена'}
              name="price"
              onChange={handleChange}
              value={values.price}
            />
          </FormRow>
          <FormRow>
            <Input
              fw
              placeholder={'Артикул'}
              name="code"
              onChange={handleChange}
              value={values.code}
            />
          </FormRow>
          <FormRow>
            <Button
              type={'submit'}
              disabled={isSubmitting}
            >
              Сохранить
            </Button>
          </FormRow>
        </form>
      )}
    </Formik>
  );};

export default CasesForm;
