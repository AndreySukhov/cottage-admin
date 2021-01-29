import React from 'react'
import cc from 'classcat'

import css from './style.module.css'

const FormRow = ({ className, lastRow, submitRow,  ...props }) => {

  return <div className={cc([css.formRow, className, {
    [`${css['last-row']}`]: !!lastRow,
    [`${css['submit-row']}`]: !!submitRow,
  }])} {...props} />
}

export default FormRow
