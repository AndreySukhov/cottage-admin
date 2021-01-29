export const style = {
  control: () => ({
    border: '1px solid #828282',
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center',
    padding: '18px 16px'
  }),
  indicatorSeparator: () => ({
    display: 'none',
    opacity: 0
  }),
  placeholder: () => ({
    color: `var(--black)`,
    margin: '0'
  }),
  dropdownIndicator: () => ({
    padding: 0,
    color: 'var(--black)',
    background: 'var(--white)'
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: `165px`,
    padding: 0
  }),
  valueContainer: () => ({
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box'
  })
}
