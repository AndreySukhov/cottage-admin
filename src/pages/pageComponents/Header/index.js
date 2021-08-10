import React, { useContext } from 'react';
import {
  Link,
  useRouteMatch,
} from 'react-router-dom';


import Button from '../../../components/form/Button';
import { AppContext } from '../../../App';
import { USER_ROLES } from '../../../utils/constants';

import style from './style.module.css';

import {ReactComponent as Gear} from '../../../assets/icons/gear.svg';
import {ReactComponent as Excel} from '../../../assets/icons/excel.svg';
import {ReactComponent as Refresh} from '../../../assets/icons/refresh.svg';
import {ReactComponent as Diskete} from '../../../assets/icons/diskette.svg';

const Header = () => {
  const {
    user,
    handleAuthState,
    handleManageCottageVisible } = useContext(AppContext);
  let isFormPage = !!useRouteMatch('/cottageForm/:cottageId')?.isExact;

  return (
    <>
      <header className={style.wrap}>
        <div className={style.content}>
          {user?.isOwner && (
            <div className={style['settings-wrap']}>
              <Link to={'/manageUsers'} className={`button-clear-style ${style['setting-link']}`}>
                <Gear />
              </Link>
            </div>
          )}
          <div className={style.user}>
            <Link to={'/'}>
              {user?.email}
            </Link>
            <br/>
            <div>
              <Button view="text" type="button" onClick={() => {
                handleAuthState(null);
              }}>
                Выход
              </Button>
            </div>
          </div>
          {(user?.isAdmin || user?.isOwner) && (
          <div className={style['add-item']}>
            <Button view={'dark'} onClick={() => handleManageCottageVisible(true)}>
              Добавить страницу коттеджа
            </Button>
          </div>
          )}
          <div className={style['header-actions']}>
            <div className={style['header-actions-item']}>
              <Button view={'text'} icon={<Excel />} disabled={!isFormPage}>
                экспортировать в эксель
              </Button>
            </div>
          </div>
          <div className={style['header-publish']}>
            <div className={style['header-publish-item']}>
              <Button view={'bordered'} disabled={!isFormPage}>
                Предварительный просмотр
              </Button>
            </div>
            <div className={style['header-publish-item']}>
              <Button disabled={!isFormPage}>
                Опубликовать
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};


export default Header;
