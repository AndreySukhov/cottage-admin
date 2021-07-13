import React from 'react';
import {Formik} from 'formik';

import Input from '../../../components/form/Input';
import Button from '../../../components/form/Button';
import SubmitRow from '../../../components/form/SubmitRow';
import FormRow from '../../../components/form/FormRow';
import TextBlock from '../../../components/typography/TextBlock';
import OptionForm from '../OptionForm';
import {ReactComponent as Refresh} from '../../../assets/icons/refresh.svg';
import api from '../../../api';
import {toast} from 'react-toastify';
import {httpErrorCodeToMessage} from '../../../utils';

const Configuration = ({
  onExit,
  projectId,
  activeConstructiveData,
  setConstructiveInfo,
}) => {
  return (
    <div>
      <Formik
        initialValues={{
          description: '',
          name: activeConstructiveData?.name,
        }}
        onSubmit={(values, {setSubmitting}) => {
          setSubmitting(true);

          let method = 'post';
          let url = 'Constructives/create';

          if (activeConstructiveData?.id) {
            method = 'put';
            url = `Constructives/update/${activeConstructiveData.id}`;
          }
          api[method](url, {
            name: values.name,
            projectId
          }).then((res) => {
            setConstructiveInfo(res.data.data);
            setSubmitting(false);
          }).catch((e) => {
            console.error(e);
            toast.error(httpErrorCodeToMessage(e?.response?.status));
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
                placeholder={'Название конструктива'}
                name="name"
                onChange={handleChange}
                value={values.name}
              />
            </FormRow>
            <SubmitRow>
              <Button type={'submit'} disabled={isSubmitting}>
                {activeConstructiveData ? 'Редактировать' : 'Сохранить'}
              </Button>
              <Button view={'text'} type={'button'} onClick={onExit} icon={<Refresh />}>
                Отменить
              </Button>
            </SubmitRow>
          </form>
        )}
      </Formik>
      <br/>
      {!activeConstructiveData && (
        <TextBlock>
          Для добавления опций необходимо создать конструктив
        </TextBlock>
      )}
    </div>
  );
};

export default Configuration;
