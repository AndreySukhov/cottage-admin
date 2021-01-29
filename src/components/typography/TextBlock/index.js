import React from 'react'
import cc from 'classcat'
import PropTypes from 'prop-types'
import style from './style.module.css'

const TextBlock = ({ children, className, tagName, size, tc }) => {
  let Tag = 'div'

  if (tagName) {
    Tag = `${tagName}`
  }

  return (
    <Tag className={cc([style.text, style[`text--${size}`], {
      [style.centered]: tc
    }, className])}>
      {children}
    </Tag>
  )
}

TextBlock.defaultProps = {
  size: 'm',
  className: '',
}

TextBlock.propTypes = {
  size: PropTypes.string,
  tagName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
}

export default TextBlock
