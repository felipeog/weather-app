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

function Home() {
  const [homeState, setHomeState] = useState(homeInitialState)

  const renderWeatherContent = () => {
    const { data, loading, error, cityName } = homeState

    if (error) return <p className="message">Ocorreu um erro</p>
    if (loading) return <p className="message">Carregando...</p>
    if (!data?.length)
      return <p className="message">Comece pesquisando pela cidade</p>

    const currentDay = data[0]
    const weekForecast = data.slice(1, data.length - 1)

    return (
      <>
        <CurrentDayWeather {...{ currentDay, cityName }} />
        <WeekForecast {...{ weekForecast }} />
      </>
    )
  }

  const fetchWeather = ({ coords, label }) => {
    setHomeState({
      ...homeInitialState,
      loading: true,
    })

    const { lon, lat } = coords

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&lang=pt_br&appid=9c748f1affe9afcc2abf05052a3a615f`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data.daily)
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
