import React, { useState, useEffect } from 'react';
import {
  useRouteMatch
} from 'react-router-dom';
import {Helmet} from "react-helmet";

import Heading from "../../components/typography/Heading";
import EmptyBlock from './EmptyBlock'
import Modal from "../../components/Modal";
import Documentation from './Documentation'
import Configuration from './Configuration'
import BaseInfo from './BaseInfo'

import style from './style.module.css'
import api from '../../api'
import { getLocalCurrencyStr } from '../../utils'
import InfoCard from "../../components/InfoCard";

const CottageForm = (props) => {

  const routeMatch = useRouteMatch()
  const [formStep, setFormStep] = useState(null)
  const [baseInfo, setBaseInfo] = useState(null)
  const [projectId, setProjectId] = useState(null)

  useEffect(() => {
    if (routeMatch?.params?.cottageId && routeMatch.params.cottageId !== 'new') {
      setProjectId(routeMatch.params.cottageId)
    }
  }, [routeMatch?.params?.cottageId])

  useEffect(() => {
    const id = routeMatch?.params?.cottageId

    if (id && id !== 'new') {
      // fetch data
      api.get(`Project/get/${id}`)
        .then((res) => {
          setBaseInfo(res.data.data)
        })
    }
  }, [])

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
        {baseInfo ? (
          <InfoCard
            onClick={() => setFormStep('baseInfo')}
            rightAside={getLocalCurrencyStr(baseInfo.price)}>
            {baseInfo.description}
          </InfoCard>
        )
        : (
            <EmptyBlock
              onClick={() => setFormStep('baseInfo')}
              text={'Добавить базовую информацию о коттедже'} />
          )}
      </div>
      {projectId && (
        <>
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
        </>
      )}
      {formStep && (
        <Modal
          onExit={() => setFormStep(null)}
          xl
          isOpen>
          {formStep === 'baseInfo' && (
            <BaseInfo
              projectId={projectId}
              onSuccess={(data) => {
                setBaseInfo(data)
                setFormStep(null)
              }}
              data={baseInfo}
              onExit={() => setFormStep(null)}
            />
          )}
          {formStep === 'configuration' && (
            <Configuration
              projectId={projectId}
              onExit={() => setFormStep(null)}
            />
          )}
          {formStep === 'documentation' && (
            <Documentation
              projectId={projectId}
              onExit={() => setFormStep(null)}
            />
          )}
        </Modal>
      )}
    </div>
  )
}

export default CottageForm;
