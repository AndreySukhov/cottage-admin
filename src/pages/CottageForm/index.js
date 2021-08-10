import React, {useState, useEffect, useCallback} from 'react';
import {
  useRouteMatch
} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import Heading from '../../components/typography/Heading';
import EmptyBlock from './EmptyBlock';
import Modal from '../../components/Modal';
import Configuration from './Configuration';
import BaseInfo from './BaseInfo';
import OptionsPreview from './OptionsPreview';

import style from './style.module.css';
import api from '../../api';
import {getLocalCurrencyStr, declension, httpErrorCodeToMessage} from '../../utils';
import InfoCard from '../../components/InfoCard';
import Button from '../../components/form/Button';
import OptionForm from './OptionForm';
import CasesForm from './CaseForm';
import {toast} from "react-toastify";

const CottageForm = (props) => {

  const routeMatch = useRouteMatch();
  const [formStep, setFormStep] = useState(null);
  const [baseInfo, setBaseInfo] = useState(null);
  const [constructiveInfo, setConstructiveInfo] = useState([]);
  const [activeConstructiveData, setActiveConstructiveData] = useState(null);
  const [activeOptionData, setActiveOptionData] = useState(null);
  const [activeCaseData, setActiveCaseData] = useState(null);
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    if (routeMatch?.params?.cottageId && routeMatch.params.cottageId !== 'new') {
      setProjectId(routeMatch.params.cottageId);
    }
  }, [routeMatch?.params?.cottageId]);

  const handleRouteChange = () => {
    setBaseInfo(null)
    setConstructiveInfo([])
    setFormStep(null);
    setActiveConstructiveData(null);
    setActiveOptionData(null);
    setActiveCaseData(null);
  }

  const handleCaseUpdate = (data) => {
    const { constructiveId, optionId, ...rest } = data

    const constructiveInfoCopy = [...constructiveInfo].map((item) => {
      if (item.id === constructiveId) {
        if (item.options.length) {
          return {
            ...item,
            options: item.options.map((optionItem) => {
              if (optionItem.id === optionId) {
                if (optionItem?.cases.find((caseItem) => caseItem.id === data.id)) {
                  return {
                    ...optionItem,
                    cases: optionItem.cases.map((caseLocalItem) => {
                      if (caseLocalItem.id === rest.id) {
                        return rest
                      }
                      return caseLocalItem
                    })
                  }
                }

                if (optionItem?.cases?.length > 0) {
                  return {
                    ...optionItem,
                    cases: [...optionItem.cases, rest]
                  }
                }
                return {
                  ...optionItem,
                  cases: [rest]
                }
              }

              return optionItem
            })
          }
        }
      }
      return item
    })
    setConstructiveInfo(constructiveInfoCopy);
  }

  const handleOptionUpdate = (data) => {
    const {  constructiveId, ...rest } = data
    console.log(data, 'data')

    const constructiveInfoCopy = [...constructiveInfo].map((item) => {
      if (item.id === constructiveId) {
        if (item.options.length) {
          return {
            ...item,
            options: item.options.map((optionItem) => {
              if (optionItem.id === rest.id) {
                console.log(optionItem,'optionItem')
                console.log(rest,'rest')
                console.log('hit')
                return rest
              }

              return optionItem
            })
          }
        }

        return {
          ...item,
          options: [rest]
        }
      }
      return item
    })
    setConstructiveInfo(constructiveInfoCopy);

  }

  const handleCaseRemove = (data) => {
    const {  constructiveId, optionId, ...rest } = data

    api.delete(`Cases/delete/${data.id}`)
      .then((res) => {
        if (res.status === 200) {
          const constructiveInfoCopy = [...constructiveInfo].map((item) => {
            if (item.id === constructiveId) {
              if (item.options.length) {
                return {
                  ...item,
                  options: item.options.map((optionItem) => {
                    if (optionItem.id === optionId) {
                      if (optionItem?.cases.find((caseItem) => caseItem.id === data.id)) {
                        return {
                          ...optionItem,
                          cases: optionItem.cases.filter((caseItem) => caseItem.id !== rest.id)
                        }
                      }

                      return optionItem
                    }

                    return optionItem
                  })
                }
              }
            }
            return item
          })
          setConstructiveInfo(constructiveInfoCopy);
        } else {
          toast.error(httpErrorCodeToMessage());
        }
      }).catch((e) => {
      toast.error(e?.response?.data?.meta?.message || httpErrorCodeToMessage(e?.response?.status));
    });
  }

  const handleOptionRemove = (data) => {

    api.delete(`Options/delete/${data.optionId}`)
      .then((res) => {
        if (res.status === 200) {
          const constructiveInfoCopy = [...constructiveInfo].map((item) => {
            if (item.id === data.constructiveId) {
              if (item.options.length) {
                return {
                  ...item,
                  options: item.options.filter(({id}) => data.optionId !== id)
                }
              }
            }
            return item
          })
          setConstructiveInfo(constructiveInfoCopy);
        }
      }).catch((e) => {
      toast.error(e?.response?.data?.meta?.message || httpErrorCodeToMessage(e?.response?.status));
    });
  }

  const handleConstructiveRemove = (constructiveId) => {
    api.delete(`Constructives/delete/${constructiveId}`)
      .then((res) => {
        if (res.status === 200) {
          const constructiveInfoCopy = [...constructiveInfo].filter(({id}) => constructiveId !== id)
          setConstructiveInfo(constructiveInfoCopy);
        }
      }).catch((e) => {
      toast.error(e?.response?.data?.meta?.message || httpErrorCodeToMessage(e?.response?.status));
    });
  }

  useEffect(() => {
    const id = routeMatch?.params?.cottageId;

    if (id && id !== 'new') {
      // fetch data
      handleRouteChange()
      api.get(`Project/get/${id}`)
        .then((res) => {
          setBaseInfo(res.data.data);
        });

      const handleSetOptionsData = async (constructiveInfo) => {
        const constructiveIds = constructiveInfo.map(({id}) => id)

        if (constructiveIds.length) {
          const formattedIds = constructiveIds.map((constructiveId) => {
            return `ConstructiveIds[]=${constructiveId}`
          })

          const optionsData = await api.get(`Options?${formattedIds.join('&')}`)

          const optionsMap = {}
          const casesByOptionsMap = {}
          const optionsResponseData = optionsData.data.data
          optionsResponseData.forEach((option) => {
            if (optionsMap[option.constructiveId]) {
              optionsMap[option.constructiveId].push(option)
            } else {
              optionsMap[option.constructiveId] = [option]
            }
          })

          const optionsIds = optionsResponseData.map(({id}) => id)

          await Promise.all(optionsIds.map(async optionId => {
           const optionCases = await api.get(`Options/${optionId}/cases`)
            optionCases.data.data.forEach((caseItem) => {
              if (casesByOptionsMap[caseItem.optionId]) {
                casesByOptionsMap[caseItem.optionId].push(caseItem)
              } else {
                casesByOptionsMap[caseItem.optionId] = [caseItem]
              }
            })
          }));

          const constructiveInfoWithOptions = constructiveInfo.map((infoItem) => {
            return {
              ...infoItem,
              options: optionsMap[infoItem.id]
                ?
                optionsMap[infoItem.id].map((optionsItem) => {
                  if (casesByOptionsMap[optionsItem.id]) {
                    return {
                      ...optionsItem,
                      cases: casesByOptionsMap[optionsItem.id]
                    }
                  }
                  return optionsItem
                })
                :
                []
            }
          })
          setConstructiveInfo(constructiveInfoWithOptions);
        } else {
          setConstructiveInfo(constructiveInfo);
        }
      }

      api.get(`Project/${id}/constructives`)
        .then((res) => {
          handleSetOptionsData(res.data.data)
        });
    }
  }, [routeMatch?.params?.cottageId]);

  const handleModalExit = () => {
    setFormStep(null);
    setActiveConstructiveData(null);
    setActiveOptionData(null)
    setActiveCaseData(null)
  };

  useEffect(() => {
    handleModalExit();
  }, [constructiveInfo]);

  useEffect(() => {
    if (!formStep) {
      handleModalExit()
    }}, [formStep])

  const handleUpdateConstructiveInfo = (data) => {
    let newData = [...constructiveInfo];
    if (constructiveInfo.some((item) => item.id === data.id)) {
      newData = newData.map((item) => {
        if (item.id === data.id) {
          return data;
        }
        return item;
      });
    } else {
      newData = [...newData, data];
    }
    setConstructiveInfo(newData);
  };

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
              setActiveConstructiveData(constructiveData);
              setFormStep('baseInfo');
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
              <>
                <OptionsPreview
                  onConstructiveClick={(activeConstructiveData) => {
                    setFormStep('configuration');
                    setActiveConstructiveData(activeConstructiveData);
                  }}
                  onOptionCreate={(activeConstructiveData) => {
                    setFormStep('option');
                    setActiveConstructiveData(activeConstructiveData);
                  }}
                  onOptionEdit={(activeConstructiveData, activeOptionData) => {
                    setFormStep('option');
                    setActiveConstructiveData(activeConstructiveData);
                    setActiveOptionData(activeOptionData);
                  }}
                  handleCaseFormData={(activeCaseData) => {
                    setFormStep('case')
                    setActiveCaseData(activeCaseData)
                  }}
                  handleConstructiveRemove={(constructiveId) => handleConstructiveRemove(constructiveId)}
                  handleOptionRemove={(data) => handleOptionRemove(data)}
                  handleCaseRemove={(data) => handleCaseRemove(data)}
                  constructiveInfo={constructiveInfo} />
                <div>
                  <Button
                    onClick={() => setFormStep('configuration')}
                    view={'add'}
                  >
                        + Добавить конструктив
                  </Button>
                </div>
              </>
            ) : (
              <EmptyBlock
                onClick={() => setFormStep('configuration')}
                text={'Добавить карточку конструктива'} />
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
                setBaseInfo(data);
                setFormStep(null);
              }}
              data={baseInfo}
              onExit={handleModalExit}
            />
          )}
          {formStep === 'configuration' && (
            <Configuration
              projectId={Number(projectId)}
              activeConstructiveData={activeConstructiveData}
              setConstructiveInfo={handleUpdateConstructiveInfo}
              onExit={handleModalExit}
            />
          )}
          {formStep === 'option' && activeConstructiveData && (
            <OptionForm
              optionData={activeOptionData}
              constructiveId={activeConstructiveData.id}
              onSuccess={(data) => {
                handleOptionUpdate(data)
                handleModalExit();
              }}
            />
          )}
          {formStep === 'case' && (
            <CasesForm
              caseData={activeCaseData}
              onSuccess={(data) => {
                handleCaseUpdate(data)
                handleModalExit()
              }}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default CottageForm;
