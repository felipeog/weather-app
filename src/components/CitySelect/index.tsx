import React, { Dispatch, SetStateAction } from 'react'
import { ValueType, OptionsType } from 'react-select'
import AsyncSelect from 'react-select/async'
import Option from './Option'
import DropdownIndicator from './DropdownIndicator'
import selectStyles from './selectStyles'
import normalizeString from '../../utils/normalizeString'
import cityOptions from '../../consts/cityOptions'

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
  setCity: Dispatch<SetStateAction<CityOption | undefined>>
}

const loadOptions = (
  inputValue: string,
  callback: (options: OptionsType<CityOption>) => void,
) => {
  const filteredOption = cityOptions
    .filter(c => {
      const label = normalizeString(c.label)
      const value = normalizeString(inputValue)

      return label.includes(value)
    })
    .slice(0, 5)

  callback(filteredOption)
}

const CitySelect: React.FC<Props> = ({ setCity }) => {
  const handleChange = (value: ValueType<CityOption>) => {
    setCity(value as CityOption)
  }

  return (
    <AsyncSelect
      className="CitySelect"
      value={null}
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
