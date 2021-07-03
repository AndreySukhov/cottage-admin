import React, { useState, useEffect } from 'react';
import {
  useRouteMatch
} from 'react-router-dom';
import {Helmet} from "react-helmet";

import Heading from "../../components/typography/Heading";
import EmptyBlock from './EmptyBlock'
import Modal from "../../components/Modal";
import Configuration from './Configuration'
import BaseInfo from './BaseInfo'
import OptionsPreview from './OptionsPreview'

import style from './style.module.css'
import api from '../../api'
import { getLocalCurrencyStr, declension } from '../../utils'
import InfoCard from "../../components/InfoCard";

const CottageForm = (props) => {

  const routeMatch = useRouteMatch()
  const [formStep, setFormStep] = useState(null)
  const [baseInfo, setBaseInfo] = useState(null)
  const [constructiveInfo, setConstructiveInfo] = useState(null)
  const [activeConstructiveData, setActiveConstructiveData] = useState(null)
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

      api.get(`Project/${id}/constructives`)
        .then((res) => {
          setConstructiveInfo(res.data.data)
        })
    }
  }, [routeMatch?.params?.cottageId])

  return (
    <div className={style['page-wrap']}>
      <Helmet>
        <title>
          {props?.match?.params?.cottageId === 'new' ? 'Добавление коттеджа' : 'Управление коттеджем'}
        </title>
      </Helmet>
      <div className={style['page-row']}>
        <Heading level={2}>
          Базовые параметры и строительная документация
        </Heading>
        {baseInfo ? (
          <InfoCard
            onClick={(constructiveData) => {
              setActiveConstructiveData(constructiveData)
              setFormStep('baseInfo')
            }}
            rightAside={getLocalCurrencyStr(baseInfo.price)}>
            {baseInfo.files?.length > 0 && (
              <>
                {baseInfo.files.length}
                {' '}
                {declension(['файл', 'файла', 'файлов'], baseInfo.files.length)}
                {' '}
              </>
            )}
            {baseInfo.description}
          </InfoCard>
        )
        : (
            <EmptyBlock
              onClick={() => setFormStep('baseInfo')}
              text={'Добавить базовую информацию и строительную документацию'} />
          )}
      </div>
      {projectId && (
        <>
          <div className={style['page-row']}>
            <Heading level={2}>
              Конфигурации
            </Heading>
            {constructiveInfo ? (
                <OptionsPreview
                  onConstructiveClick={(activeConstructiveData) => {
                    setFormStep('configuration')
                    setActiveConstructiveData(activeConstructiveData)
                  }}
                  constructiveInfo={constructiveInfo}/>
            ) : (
              <EmptyBlock
                onClick={() => setFormStep('configuration')}
                text={'Добавить карточку конструктива и опции'} />
            )}
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
              projectId={Number(projectId)}
              activeConstructiveData={activeConstructiveData}
              setConstructiveInfo={(data) => {
                console.log(data, 'data')
              }}
              onExit={() => {
                setFormStep(null)
                setActiveConstructiveData(null)
              }}
            />
          )}
        </Modal>
      )}
    </div>
  )
}

export default CottageForm;
