import React, {useContext, useState, useEffect, Fragment} from 'react';
import cc from 'classcat';
import OutsideClickHandler from 'react-outside-click-handler';
import {toast} from 'react-toastify';
import {
  Link
} from 'react-router-dom';
import api from '../../../api';

import Button from '../../../components/form/Button';
import Input from '../../../components/form/Input';
import Preloader from '../../../components/Preloader';

import {AppContext} from '../../../App';
import RenameProject from './RenameProject';

import style from './style.module.css';

import {ReactComponent as Refresh} from '../../../assets/icons/refresh.svg';
import {ReactComponent as Burger} from '../../../assets/icons/burger.svg';
import {httpErrorCodeToMessage} from '../../../utils';

const ManageCottage = ({onClose}) => {
  const context = useContext(AppContext);

  const [cottageData, setCottageData] = useState([]);
  const [mode, setMode] = useState('pending');
  const [contextMenuId, setContextMenuId] = useState(null);
  const [contextMenuActionDetails, setContextMenuActionDetails] = useState(null);
  const [contextActionText, setContextActionText] = useState('');

  useEffect(() => {
    setMode('pending');
    api.get('Project')
      .then((res) => {
        setCottageData(res.data.data);
      });
    setMode('initial');
  }, []);

  const clearContextMenuData = () => {
    setContextMenuId(null);
    setContextActionText('');
    setContextMenuActionDetails(null);
  };

  const handleActions = ({id, actionType, ...rest}) => {
    clearContextMenuData();
    setContextMenuActionDetails({
      id,
      actionType,
      ...rest
    });
  };

  const handleContextActionBtn = ({id, actionType}) => {
    clearContextMenuData();
  };

  const handleRemove = (id) => {
    api.delete(`Project/delete/${id}`)
      .then((res) => {
        clearContextMenuData();
        setCottageData(cottageData.filter((cottage) => cottage.id !== id));
      }).catch((e) => {
        console.error(e);
        toast.error(e?.response?.data?.meta?.message || httpErrorCodeToMessage(e?.response?.status));
      });
  };

  const handleDuplicate = (id) => {
    if (!id) {
      return false;
    }

    api.post(`Project/${id}/duplicate`)
      .then((res) => {
        clearContextMenuData();
        setCottageData([...cottageData, res.data.data]);
      }).catch((e) => {
        console.error(e);
        toast.error(e?.response?.data?.meta?.message || httpErrorCodeToMessage(e?.response?.status));
      });
  };

  if (mode === 'pending') {
    return (<Preloader/>);
  }

  return (
    <div>
      <div className={style.list}>
        {cottageData.map((cottage) => {
          if (contextMenuActionDetails?.id === cottage.id) {
            return (
              <Fragment key={cottage?.id}>
                <RenameProject
                  onExit={clearContextMenuData}
                  onSuccess={(data) => {
                    setCottageData(cottageData.map((cottage) => {
                      return data.id === cottage.id ? data : cottage;
                    }));
                    clearContextMenuData();
                  }}
                  cottage={contextMenuActionDetails.cottage}/>
              </Fragment>
            );
          }

          return (
            <div className={style['list-row']} key={cottage?.id}>
              <div className={style['list-row-value']}>
                <Input readOnly value={cottage?.name} fw/>
              </div>
              <div className={cc([style['list-row-btn'], style['context-menu-wrap']])}>
                <Button
                  className={'button-clear-style'}
                  onClick={() => {
                    setContextMenuId((contextMenuId || contextMenuId === 0) ? null : cottage.id);
                  }}>
                  <Burger/>
                </Button>
                {(contextMenuId === cottage.id) && (
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      clearContextMenuData();
                    }}
                  >
                    <div className={style['context-menu']}>
                      <div className={style['context-menu-inner']}>
                        <Link to={`/cottageForm/${cottage.id}`}
                          onClick={onClose}
                          className={cc(['button-clear-style', style['context-menu-item']])}>
                        редактировать
                        </Link>
                        <button
                          onClick={() => handleActions({id: cottage?.id, cottage, actionType: 'rename'})}
                          className={cc(['button-clear-style', style['context-menu-item']])}>
                        переименовать
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDuplicate(cottage?.id)}
                          className={cc(['button-clear-style', style['context-menu-item']])}>
                        дублировать
                        </button>
                        <button
                          type="button"
                          onClick={() => handleActions({id: cottage?.id, actionType: 'link'})}
                          className={cc(['button-clear-style', style['context-menu-item']])}>
                        связать с
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemove(cottage?.id)}
                          className={cc(['button-clear-style', style['context-menu-item']])}>
                        удалить страницу
                        </button>
                      </div>
                    </div>
                  </OutsideClickHandler>
                )}
              </div>
            </div>
          );
        })}
        {mode === 'initial' && (
          <div className={style['list-row']}>
            <div className={style['list-row-value']}>
              <Button
                to='/cottageForm/new'
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
                    {cottageData.filter(({title}) => {
                      return title.toLowerCase().includes(contextActionText.toLowerCase());
                    }).map((item) => {
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            handleContextActionBtn({actionType: contextMenuActionDetails.actionType, id: item.id});
                          }}
                          type="button"
                          className={cc(['button-clear-style', style['autocomplete-list-item']])}>
                          {item.title}
                        </button>
                      );
                    })}
                  </>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div>
        <br/>
        <Button view={'text'} icon={<Refresh/>} onClick={() => context.handleManageCottageVisible(false)}>
          Отменить
        </Button>
      </div>
    </div>
  );
};

export default ManageCottage;
