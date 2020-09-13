const selectStyles = {
  control: (provided: object) => ({
    ...provided,
    background: 'transparent',
    border: 'none',
    borderBottom: '.1rem solid #d6d6d6',
    borderRadius: 0,
    boxShadow: 'none',
    '&:hover': {
      borderBottom: '.1rem solid #d6d6d6',
    },
  }),
  input: (provided: object) => ({
    ...provided,
    color: '#d6d6d6',
    input: {
      font: 'inherit',
    },
  }),
  menu: (provided: object) => ({
    ...provided,
    background: '#060606',
  }),
  noOptionsMessage: (provided: object) => ({
    ...provided,
    background: '#161616',
  }),
  option: (
    provided: object,
    state: { isSelected: object; isFocused: object },
  ) => ({
    ...provided,
    '&:hover': { background: '#363636' },
    background: (state.isSelected ? '#262626' : state.isFocused)
      ? '#262626'
      : '#161616',
    '.subLabel': {
      fontSize: '.8rem',
      marginTop: '.2rem',
      color: '#969696',
    },
  }),
  indicatorsContainer: (provided: object) => ({
    ...provided,
    width: '1.2rem',
    svg: {
      width: '1.2rem',
      fill: '#d6d6d6',
    },
  }),
}

export default selectStyles
