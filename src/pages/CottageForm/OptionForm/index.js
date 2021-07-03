import React, { useState } from 'react';
import {Formik} from 'formik';
import api from "../../../api";
import {toast} from "react-toastify";
import {httpErrorCodeToMessage} from "../../../utils";
import FormRow from "../../../components/form/FormRow";
import Input from "../../../components/form/Input";
import Button from "../../../components/form/Button";
import SelectInput from "../../../components/form/SelectInput";
import FileUpload from "../../../components/form/FileUpload";

const OptionForm = ({constructiveId}) => {

  const [filesIds, setFilesIs] = useState([])
  const [optionType, setOptionType] = useState(null)

  const handleAddOption = () => {

  }

return (
  <Formik
    initialValues={{
      name: '',
      code: "string",
      constructiveId,
      price: 0,
    }}
    onSubmit={(values, {setSubmitting}) => {

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
            options={[
              { value: 'Option', label: 'опция'},
              { value: 'AdditionalOption', label: 'дополнительная опция'},
            ]} />
        </FormRow>
        <FormRow>
          <Button
            onClick={handleAddOption}
            type="button"
            view="text">
            Добавить вариант опций
          </Button>
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
            previewText={'Перетащите сюда файлы опций'}/>
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
          <Button type={'submit'} disabled={isSubmitting}>
            Сохранить
          </Button>
        </FormRow>
      </form>
    )}
  </Formik>
)}

export default OptionForm
