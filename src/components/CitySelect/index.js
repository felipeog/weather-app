import React from 'react'
import Option from './Option'
import DropdownIndicator from './DropdownIndicator'
import selectStyles from './selectStyles'
import AsyncSelect from 'react-select/async'
import cities from '../../consts/cities.json'
import states from '../../consts/states.json'

const getStateNameByUfCode = ufCode => {
  const state = states.find(s => s.ufCode === ufCode)

  return state?.name || ''
}

const citiesOptions = cities.map(({ name, ibgeCode, ufCode, lon, lat }) => ({
  label: name,
  value: ibgeCode,
  subLabel: getStateNameByUfCode(ufCode),
  coords: {
    lon: lon,
    lat: lat,
  },
}))

const toSlug = string => {
  const trimmedString = string.replace(/^\s+|\s+$/g, '')
  const lowerCaseString = trimmedString.toLowerCase()
  const from = 'ãàáäâèéëêìíïîõòóöôùúüûñç·/_,:;'
  const to = 'aaaaaeeeeiiiiooooouuuunc------'

  let removedAccentsString = lowerCaseString
  for (let i = 0, l = from.length; i < l; i++) {
    const regex = new RegExp(from.charAt(i), 'g')
    const character = to.charAt(i)

    removedAccentsString = removedAccentsString.replace(regex, character)
  }

  const slug = removedAccentsString
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  return slug
}

const filterCities = inputValue => {
  return citiesOptions
    .filter(c => {
      const label = toSlug(c.label)
      const value = toSlug(inputValue)

      return label.includes(value)
    })
    .slice(0, 5)
}

const loadOptions = (inputValue, callback) => {
  callback(filterCities(inputValue))
}

const CitySelect = ({ setCity }) => {
  const handleChange = ({ coords, label }) => {
    setCity({ coords, label })
  }

  return (
    <AsyncSelect
      className="CitySelect"
      value=""
      placeholder=""
      loadOptions={loadOptions}
      onChange={handleChange}
      styles={selectStyles}
      components={{
        Option,
        DropdownIndicator,
        IndicatorSeparator: () => null,
      }}
      noOptionsMessage={({ inputValue }) => {
        return !inputValue ? 'Digite a cidade' : 'Nenhuma cidade encontrada'
      }}
    />
  )
}

export default CitySelect
