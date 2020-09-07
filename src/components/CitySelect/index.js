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

const filterCities = inputValue => {
  return citiesOptions
    .filter(c => {
      const label = c.label.toLowerCase()
      const value = inputValue.toLowerCase()

      return label.includes(value)
    })
    .slice(0, 5)
}

const loadOptions = (inputValue, callback) => {
  callback(filterCities(inputValue))
}

function CitySelect({ fetchWeather }) {
  return (
    <AsyncSelect
      className="CitySelect"
      cacheOptions
      loadOptions={loadOptions}
      onChange={fetchWeather}
      styles={selectStyles}
      components={{
        Option,
        DropdownIndicator,
        IndicatorSeparator: () => null,
      }}
      value=""
      placeholder=""
      noOptionsMessage={({ inputValue }) => {
        return !inputValue ? 'Digite a cidade' : 'Nenhum cidade encontrada'
      }}
    />
  )
}

export default CitySelect
