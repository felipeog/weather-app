import React from 'react'
import { ValueType, OptionsType } from 'react-select'
import AsyncSelect from 'react-select/async'
import Option from './Option'
import DropdownIndicator from './DropdownIndicator'
import selectStyles from './selectStyles'
import cities from '../../consts/cities.json'
import states from '../../consts/states.json'

type CityOption = {
  label: string
  value: number
  subLabel: string
  coords: {
    lon: number
    lat: number
  }
}

type Props = {
  setCity: (city: ValueType<CityOption>) => void
}

const getStateNameByUfCode = (ufCode: number) => {
  const state = states.find(s => s.ufCode === ufCode)

  return state?.name || ''
}

const citiesOptions: CityOption[] = cities.map(
  ({ name, ibgeCode, ufCode, lon, lat }) => ({
    label: name,
    value: ibgeCode,
    subLabel: getStateNameByUfCode(ufCode),
    coords: {
      lon: lon,
      lat: lat,
    },
  }),
)

const toSlug = (string: string) => {
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

const loadOptions = (
  inputValue: string,
  callback: (options: OptionsType<CityOption>) => void,
) => {
  const filteredOption = citiesOptions
    .filter(c => {
      const label = toSlug(c.label)
      const value = toSlug(inputValue)

      return label.includes(value)
    })
    .slice(0, 5)

  callback(filteredOption)
}

const CitySelect = ({ setCity }: Props) => {
  return (
    <AsyncSelect
      className="CitySelect"
      value={null}
      placeholder=""
      loadOptions={loadOptions}
      onChange={setCity}
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
