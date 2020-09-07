import React from 'react'
import { components } from 'react-select'

const Option = props => {
  const { label, subLabel } = props.data

  return (
    <components.Option {...props}>
      <div className="label">{label}</div>
      {!!subLabel && <div className="subLabel">{subLabel}</div>}
    </components.Option>
  )
}

export default Option
