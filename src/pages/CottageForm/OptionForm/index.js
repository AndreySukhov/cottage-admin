import React, { useState } from 'react';
import {Formik} from 'formik';
import api from '../../../api';
import {toast} from 'react-toastify';
import {httpErrorCodeToMessage} from '../../../utils';
import FormRow from '../../../components/form/FormRow';
import Input from '../../../components/form/Input';
import Button from '../../../components/form/Button';
import SelectInput from '../../../components/form/SelectInput';
import FileUpload from '../../../components/form/FileUpload';

const OPTIONS = [
  { value: 'Option', label: 'опция'},
  { value: 'AdditionalOption', label: 'дополнительная опция'},
];

const OptionForm = ({
  constructiveId,
  optionData,
  onSuccess
}) => {
  const [optionType, setOptionType] = useState(() => {
    if (optionData?.type) {
      return OPTIONS.find((({value}) => value === optionData.type))
    }

    return null
  });

  return (
    <Formik
      initialValues={{
        name: optionData?.name,
        description: optionData?.description,
        constructiveId,
      }}
      onSubmit={(values, {setSubmitting}) => {
        if (!optionType) {
          toast.error('Необходимо выбрать тип опции');
          return false;
        }

        setSubmitting(true);

        let method = 'post';
        let url = 'Options/create';

        if (optionData?.id) {
          method = 'put';
          url = `Options/update/${optionData.id}`;
        }

        api[method](url, {
          name: values.name,
          description: values.description,
          constructiveId,
          type: optionType.value,
        }).then((res) => {
          onSuccess({
            constructiveId,
            ...res.data.data
          });
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
              placeholder={'Название опции'}
              name="name"
              onChange={handleChange}
              value={values.name}
            />
          </FormRow>
          <FormRow>
            <SelectInput
              onChange={setOptionType}
              selectedOption={optionType}
              options={OPTIONS} />
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

export default OptionForm;
