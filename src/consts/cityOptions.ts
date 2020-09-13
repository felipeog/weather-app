import cities from './cities.json'
import states from './states.json'

type CityOption = {
  label: string
  value: number
  subLabel: string
  coords: {
    lon: number
    lat: number
  }
}

const getStateNameByUfCode = (ufCode: number) => {
  const state = states.find(s => s.ufCode === ufCode)

  return state?.name || ''
}

const cityOptions: CityOption[] = cities.map(
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

export default cityOptions
