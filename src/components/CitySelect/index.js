import React, { useState } from 'react'
import { components } from 'react-select'
import AsyncSelect from 'react-select/async'
import cities from '../../consts/cities.json'
import states from '../../consts/states.json'
import './index.scss'

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
    .slice(0, 10)
}

const weekDays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
]

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

const selectStyles = {
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

const DropdownIndicator = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 515.6 515.6">
    <defs />
    <path d="M378.3 332.8A208 208 0 00419 209.4C418.9 94 324.9 0 209.4 0S0 94 0 209.4 94 419 209.4 419a208 208 0 00123.4-40.6L470 515.6l45.6-45.6-137.3-137.2zm-168.9 21.6c-80 0-145-65-145-145s65-145 145-145 145 65 145 145-65 145-145 145z" />
  </svg>
)

const Option = props => {
  const { label, subLabel } = props.data

  return (
    <components.Option {...props}>
      <div className="label">{label}</div>
      {!!subLabel && <div className="subLabel">{subLabel}</div>}
    </components.Option>
  )
}

function CitySelect() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [cityName, setCityName] = useState('')

  const loadOptions = (inputValue, callback) => {
    callback(filterCities(inputValue))
  }

  const fetchWeather = ({ coords, label }) => {
    setError(false)
    setLoading(true)
    setCityName('')

    const { lon, lat } = coords

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&lang=pt_br&appid=9c748f1affe9afcc2abf05052a3a615f`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data.daily)
        setData(data.daily)
        setLoading(false)
        setCityName(label)
      })
      .catch(e => {
        setError(true)
        setLoading(false)
        setCityName('')
        console.error(e)
      })
  }

  const renderList = () => {
    if (error) return <p className="error">Ocorreu um erro</p>
    if (loading) return <p className="loading">Carregando...</p>
    if (!data.length)
      return <p className="empty">Comece pesquisando pela cidade</p>

    const today = data[0]
    const todayDate = new Date(today.dt * 1000)
    const todayWeekDay = weekDays[todayDate.getDay()]
    const todayDay = todayDate.getDate()
    const todayMonth = months[todayDate.getMonth()]
    const todayTemperature = Math.round(today.temp.day)
    const todayDescription = today.weather[0].description
    const todayMin = Math.round(today.temp.min)
    const todayMax = Math.round(today.temp.max)
    const todayWind = today.wind_speed
    const todayHumidity = today.humidity
    const weekForecast = data.slice(1, data.length - 1)

    return (
      <>
        <h1 className="city">{cityName}</h1>

        <p className="date">
          {todayWeekDay}—{todayDay} {todayMonth}
        </p>

        <p className="temperature">{todayTemperature}°</p>

        <div className="min-max">
          <p>{todayDescription}.</p>
          <p>
            {todayMin}°—{todayMax}°
          </p>
        </div>

        <div className="wind-humidity">
          <p>Vento: {todayWind}m/s</p>
          <p>Humidade: {todayHumidity}%</p>
        </div>

        <table className="forecast">
          <thead>
            <tr>
              <th>Dia</th>
              <th>Manhã</th>
              <th>Tarde</th>
              <th>Noite</th>
            </tr>
          </thead>

          <tbody>
            {weekForecast.map((d, index) => {
              const date = new Date(d.dt * 1000)
              const weekDay = weekDays[date.getDay()]
              const morning = Math.round(d.temp.morn)
              const evening = Math.round(d.temp.eve)
              const night = Math.round(d.temp.night)

              return (
                <tr key={index}>
                  <td>{weekDay}</td>
                  <td>{morning}°</td>
                  <td>{evening}°</td>
                  <td>{night}°</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }

  return (
    <div className="WeatherApp">
      <div className="app-container">
        <div className="selector">
          <AsyncSelect
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
              return !inputValue
                ? 'Digite a cidade'
                : 'Nenhum cidade encontrada'
            }}
          />
        </div>

        <div className="content">{renderList()}</div>
      </div>
    </div>
  )
}

export default CitySelect
