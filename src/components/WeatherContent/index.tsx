import React from 'react'
import CurrentDayWeather from '../CurrentDayWeather'
import WeekForecast from '../WeekForecast'
import './index.scss'

interface CityOption {
  label: string
  value: number
  subLabel: string
  coords: {
    lon: number
    lat: number
  }
}

interface Data {
  daily: {
    clouds: number
    dew_point: number
    dt: number
    feels_like: {
      day: number
      eve: number
      morn: number
      night: number
    }
    humidity: number
    pop: number
    pressure: number
    sunrise: number
    sunset: number
    temp: {
      day: number
      eve: number
      max: number
      min: number
      morn: number
      night: number
    }
    uvi: number
    weather: {
      description: string
      icon: string
      id: number
      main: string
    }[]
    length: number
    wind_deg: number
    wind_speed: number
  }[]
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
}

interface ErrorHandling {
  cod: number
  message: string
}

interface Props {
  status: string
  data: Data & ErrorHandling
  city: CityOption | undefined
}

const WeatherContent: React.FC<Props> = ({ status, data, city }) => {
  const renderWeatherContent = () => {
    if (status === 'error' || data?.message) {
      console.error('WeatherContent @ renderWeatherContent >>>>>', data)

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

  return <div className="WeatherContent">{renderWeatherContent()}</div>
}

export default WeatherContent
