import React, { Fragment } from 'react';
import InfoCard from '../../../components/InfoCard';
import Button from '../../../components/form/Button';
import Radio from '../../../components/form/Radio'
import CheckBox from '../../../components/form/Checkbox'
import {declension, getLocalCurrencyStr} from "../../../utils";
import style from './style.module.css'
import Heading from "../../../components/typography/Heading";

const OptionsPreview = ({
  constructiveInfo,
  onConstructiveClick,
  onOptionCreate,
  onOptionEdit,
  handleCaseFormData,
}) => {
  return (
    <>
      {constructiveInfo.map((infoItem) => {
        return (
          <div key={infoItem.id} className={style['info-item']}>
            <InfoCard
              onClick={() => onConstructiveClick(infoItem)}>
              {infoItem.name}
            </InfoCard>
            {infoItem.options.length > 0 && (
             <div className={style['option-item']}>
               <div className={style['option-item__title']}>
                 <Heading level={3}>
                   Опции конструктива {infoItem.name}
                 </Heading>
               </div>
               {infoItem.options.map((optionItem) => {
                 return (
                   <div key={optionItem.id} className={style['option-wrap']}>
                     <InfoCard
                       onClick={() => {
                         onOptionEdit(infoItem, optionItem)
                       }}>
                       <div className={style['option-content']}>
                         <div className={style['form-option-wrap']}>
                           {optionItem.type === 'Option' ?
                             (
                               <Radio defaultChecked/>
                             )
                             : (
                               <CheckBox defaultChecked/>
                             )
                           }
                         </div>
                         {optionItem.name}
                       </div>
                     </InfoCard>
                     {optionItem?.cases?.length > 0 && (
                       <div>
                         <div className={style['cases-item__title']}>
                           <Heading level={3}>
                             Варианты опций {optionItem.name}
                           </Heading>
                         </div>
                         {optionItem?.cases.map((caseItem) => {
                           return (
                             <InfoCard
                               key={caseItem.id}
                               rightAside={getLocalCurrencyStr(caseItem.price)}
                               onClick={() => {
                                 handleCaseFormData({
                                   ...caseItem,
                                   optionId: optionItem.id
                                 })
                               }}>
                               {caseItem.name}
                               {caseItem.files?.length > 0 && (
                                 <>
                                   {' '}
                                   {caseItem.files.length}
                                   {' '}
                                   {declension(['файл', 'файла', 'файлов'], caseItem.files.length)}
                                   {' '}
                                 </>
                               )}
                             </InfoCard>
                           )
                         })}
                       </div>
                     )}
                     <div>
                       <Button
                         onClick={handleCaseFormData}
                         view={'add'}
                       >
                         + Добавить вариант опции
                       </Button>
                     </div>
                     <hr/>
                   </div>
                 )
               })}
             </div>
            )}
            <Button
              onClick={() => onOptionCreate(infoItem)}
              view={'add'}
            >
            + Добавить опцию
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default OptionsPreview;
