import React, {useContext, useState, useEffect} from 'react';
import cc from 'classcat';
import api from '../../../api'

import Button from '../../../components/form/Button'
import Input from '../../../components/form/Input'
import SubmitRow from "../../../components/form/SubmitRow";
import Preloader from "../../../components/Preloader";

import {AppContext} from "../../../App";

import style from './style.module.css'

import {ReactComponent as Refresh} from "../../../assets/icons/refresh.svg";
import {ReactComponent as Burger} from "../../../assets/icons/burger.svg";

const ManageCottage = () => {
  const context = useContext(AppContext);

  const [cottageData, setCottageData] = useState([]);
  const [newCottageData, setNewCottageData] = useState([]);
  const [mode, setMode] = useState('pending');
  const [contextMenuId, setContextMenuId] = useState(null);
  const [contextMenuActionDetails, setContextMenuActionDetails] = useState(null);
  const [contextActionText, setContextActionText] = useState('');

  useEffect(() => {


    api.get('Projects')
      .then((res) => {
        console.log(res, 'Projects')
        setCottageData(res.data.data)
      })

    setMode('initial')
  }, [])

  const clearContextMenuData = () => {
    setContextMenuId(null)
    setContextActionText('')
    setContextMenuActionDetails(null)
  }

  const handleActions = ({id, actionType}) => {
    clearContextMenuData()
    setContextMenuActionDetails({
      id,
      actionType
    })
  }

  const handleContextActionBtn = ({id, actionType}) => {
    clearContextMenuData()
  }

  if (mode === 'pending') {
    return (<Preloader/>)
  }

  const cottageList = [...cottageData, ...newCottageData]

  return (
    <div>
      <div className={style.list}>
        {cottageList.map((cottage) => {
          return (
            <div className={style['list-row']} key={cottage.id}>
              <div className={style['list-row-value']}>
                <Input readOnly value={cottage.title} fw/>
              </div>
              <div className={cc([style['list-row-btn'], style['context-menu-wrap']])}>
                <Button
                  className={`button-clear-style`}
                  onClick={() => {
                    setContextMenuId((contextMenuId || contextMenuId === 0) ? null : cottage.id)
                  }}>
                  <Burger/>
                </Button>
                {(contextMenuId === cottage.id) && (
                  <div className={style['context-menu']}>
                    <div className={style['context-menu-inner']}>
                      <button
                        type="button"
                        className={cc(['button-clear-style', style['context-menu-item']])}>
                        переименовать
                      </button>
                      <button
                        type="button"
                        className={cc(['button-clear-style', style['context-menu-item']])}>
                        дублировать
                      </button>
                      <button
                        type="button"
                        onClick={() => handleActions({id: cottage.id, actionType: 'link'})}
                        className={cc(['button-clear-style', style['context-menu-item']])}>
                        связать с
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setContextMenuId(null)
                        }}
                        className={cc(['button-clear-style', style['context-menu-item']])}>
                        удалить страницу
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
        {mode === 'initial' && (
          <div className={style['list-row']}>
            <div className={style['list-row-value']}>
              <Button
                to={{
                  pathname: "/cottageForm/new",
                }}
                onClick={() => context.handleManageCottageVisible(false)}
                view="add"
                fw
              >
                + Добавить еще одну страницу коттеджа
              </Button>
            </div>
          </div>
        )}
        {(contextMenuActionDetails?.actionType === 'link' ||
          contextMenuActionDetails?.actionType === 'unlink'
        )  && (
          <div className={style['list-row']}>
            <div className={style['autocomplete-wrap']}>
              <Input
                value={contextActionText}
                onChange={(e) => setContextActionText(e.target.value)}
                fw
              />
              {contextActionText?.trim()?.length > 0 && (
                <div className={style['autocomplete-list']}>
                  <>
                    {cottageList.filter(({title}) => {
                      return title.toLowerCase().includes(contextActionText.toLowerCase())
                    }).map((item) => {
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            handleContextActionBtn({actionType: contextMenuActionDetails.actionType, id: item.id})
                          }}
                          type="button"
                          className={cc(['button-clear-style', style['autocomplete-list-item']])}>
                          {item.title}
                        </button>
                      )
                    })}
                  </>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <SubmitRow>
        <Button>
          Сохранить список коттеджей
        </Button>
        <Button view={'text'} icon={<Refresh/>} onClick={() => context.handleManageCottageVisible(false)}>
          Отменить
        </Button>
      </SubmitRow>
    </div>
  )
}

export default ManageCottage
