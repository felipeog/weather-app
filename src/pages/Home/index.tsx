import React, { useState } from 'react'
import CitySelect from '../../components/CitySelect'
import CurrentDayWeather from '../../components/CurrentDayWeather'
import WeekForecast from '../../components/WeekForecast'
import { useQuery } from 'react-query'
import './index.scss'

type Coords = {
  lon: number
  lat: number
}

type CityOption = {
  label: string
  value: number
  subLabel: string
  coords: Coords
}

const getQuery = ({ lon, lat }: Coords) => {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    exclude: 'current,minutely,hourly',
    units: 'metric',
    lang: 'pt_br',
    appid: process.env.REACT_APP_APPID || '',
  })

  return `https://api.openweathermap.org/data/2.5/onecall?${params}`
}

const fetchWeather = async (key: string, coords: Coords) => {
  if (!coords) return null

  const { lon, lat } = coords
  const res = await fetch(getQuery({ lon, lat }))

  return res.json()
}

const Home = () => {
  const [city, setCity] = useState<CityOption | undefined>()
  const { data, status } = useQuery(['weather', city?.coords], fetchWeather, {
    cacheTime: 60 * 60 * 1000,
  })

  const renderWeatherContent = () => {
    if (status === 'error' || data?.message) {
      return <p className="message">Ocorreu um erro</p>
    }

    if (status === 'loading') {
      return <p className="message">Carregando...</p>
    }

    if (status === 'success' && data?.daily) {
      const { daily } = data
      const currentDay = daily[0]
      const weekForecast = daily.slice(1)
      const cityName = city?.label

      return (
        <>
          <CurrentDayWeather currentDay={currentDay} cityName={cityName} />
          <WeekForecast weekForecast={weekForecast} />
        </>
      )
    }

    return <p className="message">Comece pesquisando a cidade</p>
  }

  return (
    <div className="Home">
      <div className="container">
        <CitySelect setCity={setCity} />

        {renderWeatherContent()}
      </div>
    </div>
  )
}

export default Home