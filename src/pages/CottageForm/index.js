import React, { useState } from 'react';
import {
  withRouter
} from 'react-router';

import Heading from "../../components/typography/Heading";
import EmptyBlock from './EmptyBlock'
import Modal from "../../components/Modal";
import Documentation from './Documentation'
import Configuration from './Configuration'
import BaseInfo from './BaseInfo'

import style from './style.module.css'
import {Helmet} from "react-helmet";

const CottageForm = (props) => {

  const [formStep, setFormStep] = useState(null)
  console.log(props)

  return (
    <div className={style['page-wrap']}>
      <Helmet>
        <title>
          {props?.match?.params?.cottageId === 'new' ? 'Добавление коттеджа' : 'Управление коттеджем'}
        </title>
      </Helmet>
      <div className={style['page-row']}>
        <Heading level={2}>
          Базовые параметры
        </Heading>
        <EmptyBlock
          onClick={() => setFormStep('baseInfo')}
          text={'Добавить базовую информацию о коттедже'} />
      </div>
      <div className={style['page-row']}>
        <Heading level={2}>
          Конфигурации
        </Heading>
        <EmptyBlock
          onClick={() => setFormStep('configuration')}
          text={'Добавить карточку конструктива и опции'} />
      </div>
      <div className={style['page-row']}>
        <Heading level={2}>
          Строительная документация
        </Heading>
        <EmptyBlock
          onClick={() => setFormStep('documentation')}
          text={'Добавить карточку строительной документации'} />
      </div>
      {formStep && (
        <Modal
          onExit={() => setFormStep(null)}
          xl
          isOpen>
          {formStep === 'baseInfo' && (
            <BaseInfo
              onExit={() => setFormStep(null)}
            />
          )}
          {formStep === 'configuration' && (
            <Configuration
              onExit={() => setFormStep(null)}
            />
          )}
          {formStep === 'documentation' && (
            <Documentation
              onExit={() => setFormStep(null)}
            />
          )}
        </Modal>
      )}
    </div>
  )
}

export default withRouter(CottageForm);
