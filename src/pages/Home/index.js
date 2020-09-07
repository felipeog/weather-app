import React, { useState } from 'react'
import CitySelect from '../../components/CitySelect'
import CurrentDayWeather from '../../components/CurrentDayWeather'
import WeekForecast from '../../components/WeekForecast'
import './index.scss'

const homeInitialState = {
  cityName: '',
  data: [],
  loading: false,
  error: false,
}

const getQuery = ({ lon, lat }) => {
  const params = new URLSearchParams({
    lat,
    lon,
    exclude: 'current,minutely,hourly',
    units: 'metric',
    lang: 'pt_br',
    appid: '9c748f1affe9afcc2abf05052a3a615f',
  })

  return `https://api.openweathermap.org/data/2.5/onecall?${params}`
}

const Home = () => {
  const [homeState, setHomeState] = useState(homeInitialState)

  const fetchWeather = ({ coords, label }) => {
    setHomeState({
      ...homeInitialState,
      loading: true,
    })

    fetch(getQuery(coords))
      .then(res => res.json())
      .then(data => {
        setHomeState(prevState => ({
          ...prevState,
          cityName: label,
          data: data.daily,
          loading: false,
        }))
      })
      .catch(e => {
        setHomeState(prevState => ({
          ...prevState,
          loading: false,
          error: true,
        }))
        console.error(e)
      })
  }

  const renderWeatherContent = () => {
    const { data, loading, error, cityName } = homeState

    if (error) {
      return <p className="message">Ocorreu um erro</p>
    }

    if (loading) {
      return <p className="message">Carregando...</p>
    }

    if (!data?.length) {
      return <p className="message">Comece pesquisando a cidade</p>
    }

    const currentDay = data[0]
    const weekForecast = data.slice(1)

    return (
      <>
        <CurrentDayWeather {...{ currentDay, cityName }} />
        <WeekForecast {...{ weekForecast }} />
      </>
    )
  }

  return (
    <div className="Home">
      <div className="container">
        <CitySelect {...{ fetchWeather }} />

        {renderWeatherContent()}
      </div>
    </div>
  )
}

export default Home
