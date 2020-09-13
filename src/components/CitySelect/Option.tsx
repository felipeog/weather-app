import React from 'react'
import { components, OptionProps } from 'react-select'

interface CityOption {
  label: string
  value: number
  subLabel: string
  coords: {
    lon: number
    lat: number
  }
}

type Props = OptionProps<CityOption>

const Option: React.FC<Props> = props => {
  const { label, subLabel } = props.data

  return (
    <components.Option {...props}>
      <div className="label">{label}</div>
      {!!subLabel && <div className="subLabel">{subLabel}</div>}
    </components.Option>
  )
}

export default Option
