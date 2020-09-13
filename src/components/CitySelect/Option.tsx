import React from 'react'
import { components, OptionProps } from 'react-select'

type CityOption = {
  label: string
  value: number
  subLabel: string
  coords: {
    lon: number
    lat: number
  }
}

const Option = (props: OptionProps<CityOption>) => {
  const { label, subLabel } = props.data

  return (
    <components.Option {...props}>
      <div className="label">{label}</div>
      {!!subLabel && <div className="subLabel">{subLabel}</div>}
    </components.Option>
  )
}

export default Option
