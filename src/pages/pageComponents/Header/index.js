import React, { useContext } from 'react';
import {
  Link
} from 'react-router-dom';

import {
  withRouter
} from 'react-router';

import Button from '../../../components/form/Button'
import { AppContext } from '../../../App'

import style from './style.module.css'

import {ReactComponent as Gear} from '../../../assets/icons/gear.svg';
import {ReactComponent as Excel} from '../../../assets/icons/excel.svg';
import {ReactComponent as Refresh} from '../../../assets/icons/refresh.svg';
import {ReactComponent as Diskete} from '../../../assets/icons/diskette.svg';

const Header = () => {
  const context = useContext(AppContext);
  return (
    <>
      <header className={style.wrap}>
        <div className={style.content}>
          <div className={style['settings-wrap']}>
            <Link to={'/manageUsers'} className={`button-clear-style ${style['setting-link']}`}>
              <Gear />
            </Link>
          </div>
          <div className={style.user}>
            test@test.test
          </div>
          <div className={style['add-item']}>
            <Button view={'dark'} onClick={() => context.handleManageCottageVisible(true)}>
              Добавить страницу коттеджа
            </Button>
          </div>
          <div className={style['header-actions']}>
            <div className={style['header-actions-item']}>
              <Button view={'text'} icon={<Excel />}>
                экспортировать в эксель
              </Button>
            </div>
            <div className={style['header-actions-item']}>
              <Button view={'text'} icon={<Refresh />}>
                отменить изменения
              </Button>
            </div>
            <div className={style['header-actions-item']}>
              <Button view={'text'} icon={<Diskete />}>
                сохранить без публикации
              </Button>
            </div>
          </div>
          <div className={style['header-publish']}>
            <div className={style['header-publish-item']}>
              <Button view={'bordered'}>
                Предварительный просмотр
              </Button>
            </div>
            <div className={style['header-publish-item']}>
              <Button>
                Опубликовать
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}


export default withRouter(Header);
