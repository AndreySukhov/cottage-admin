import React from 'react';
import cc from 'classcat';
import PropTypes from 'prop-types';

import style from './style.module.css';

const Heading = ({ children, className, level = 1, ...props }) => {
  let Tag = `h${level}`;

  return (
    <Tag
      className={cc([style['heading'], className, {
        [style[`heading--h${level}`]]: !!level,
      }])}
      {...props}
    >
      {children}
    </Tag>
  );
};
Heading.defaultProps = {
  level: 1
};

Heading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  level: PropTypes.number
};

export default Heading;
