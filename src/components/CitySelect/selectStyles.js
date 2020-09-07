export default {
  control: provided => ({
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
  input: provided => ({
    ...provided,
    color: '#d6d6d6',
    input: {
      font: 'inherit',
    },
  }),
  menu: provided => ({
    ...provided,
    background: '#060606',
  }),
  noOptionsMessage: provided => ({
    ...provided,
    background: '#161616',
  }),
  option: (provided, state) => ({
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
  indicatorsContainer: provided => ({
    ...provided,
    width: '1.2rem',
    svg: {
      width: '1.2rem',
      fill: '#d6d6d6',
    },
  }),
}
