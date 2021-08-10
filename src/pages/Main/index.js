import React, {useState, useEffect} from 'react';
import api from "../../api";

import {Link} from "react-router-dom";
import TextBlock from '../../components/typography/TextBlock'

import style from "./style.module.css";

const Main = () => {
  const [cottageData, setCottageData] = useState([]);


  useEffect(() => {
    api.get('Project')
      .then((res) => {
        setCottageData(res.data.data);
      });
  }, [])

  return (
    <div className={style['list']}>
      {cottageData.map((cottage) => {
        return (
          <Link key={cottage.id} to={`/cottageForm/${cottage.id}`} className={style['list-row']}>
            <TextBlock>
              {cottage.name}
            </TextBlock>
          </Link>
        )
      })}
    </div>
  )
}

export default Main
