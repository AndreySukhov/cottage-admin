import React, { useState } from 'react';
import api from '../../../api';

import OutsideClickHandler from 'react-outside-click-handler';
import Heading from '../../../components/typography/Heading';
import Input from '../../../components/form/Input';
import Button from '../../../components/form/Button';
import FormRow from "../../../components/form/FormRow";

import {httpErrorCodeToMessage, useDebouncedEffect} from "../../../utils";

import style from './style.module.css'
import {toast} from "react-toastify";

const ManageLinks = ({caseId}) => {
  const [search, setSearch] = useState('');
  const [pending, setPending] = useState(false);
  const [linkData, setLinkData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = async () => {
    if (!linkData) {
      return false
    }

    setPending(true)

    try {
      const { data } = await api.post(`Cases/${caseId}/link/${linkData.id}`)
      if (data.data) {
        setSearch('')
        toast.success('Связь добавлена');
      } else {
        toast.error(httpErrorCodeToMessage());
      }
    } catch (e) {
      toast.error(e?.response?.data?.meta?.message || httpErrorCodeToMessage(e?.response?.status));
    }

    setPending(false);
  }

  useDebouncedEffect(() => {
    if (search.length <= 2) {
      setSuggestions([])
      return false
    }

    api.get('Cases', {
      params: {
        NameContains: search
      }
    }).then(({data}) => {
      setSuggestions(data.data.filter(({id}) => id !== caseId))
    })

  }, [search], 300)

  return (
    <div className={style['wrap']}>
      <Heading level={3}>
        Управление связями
      </Heading>
      <FormRow>
        <OutsideClickHandler
          onOutsideClick={() => {
            setSuggestions([]);
          }}
        >
          <div className={style['suggestions-wrap']}>
            <Input
              fw
              disabled={pending}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
            />
            {suggestions.length > 0 && (
              <ul className={style['suggestions-list']}>
                {suggestions.map((suggestion) => {
                  return (
                    <li key={suggestion.id}>
                      <button
                        onClick={() => {
                          setSearch(suggestion.name)
                          setLinkData(suggestion)
                          setSuggestions([])
                        }}
                        className={style['suggestions-list__btn']}
                      >
                        {suggestion.name}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </OutsideClickHandler>
      </FormRow>
      <Button
        onClick={handleSubmit}
        disabled={pending}
        type="button">
        Добавить связь
      </Button>
    </div>
  )

}

export default ManageLinks
