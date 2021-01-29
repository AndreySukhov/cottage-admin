import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { style } from './customStyles'

const SelectInput = ({selectedOption, handleChange, options,disabled, placeholder, ...props}) => {
  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      isDisabled={disabled}
      placeholder={placeholder || ''}
      isSearchable={false}
      styles={style}
      {...props}
    />
  );
}

SelectInput.defaultProps = {
  handleChange: () => {},
  options: [],
  selectedOption: {},
}

SelectInput.propTypes = {
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,

  handleChange: PropTypes.func,

  options: PropTypes.array,

  selectedOption: PropTypes.object,
}

export default SelectInput
