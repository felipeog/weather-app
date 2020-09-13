import React from 'react'
import months from '../../consts/months'
import weekDays from '../../consts/weekDays'
import './index.scss'

type Props = {
  currentDay: {
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
  }
  cityName: string | undefined
}

const CurrentDayWeather = ({ currentDay, cityName }: Props) => {
  const date = new Date(currentDay.dt * 1000)
  const weekDay = weekDays[date.getDay()]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const temperature = Math.round(currentDay.temp.day)
  const description = currentDay.weather[0].description
  const capitalizedDescription =
    description[0].toUpperCase() + description.substring(1)
  const min = Math.round(currentDay.temp.min)
  const max = Math.round(currentDay.temp.max)
  const wind = currentDay.wind_speed
  const humidity = currentDay.humidity

  return (
    <div className="CurrentDayWeather">
      <h1 className="city">{cityName}</h1>

      <p className="date">
        {weekDay}—{day} {month}
      </p>

      <p className="temperature">{temperature}°</p>

      <div className="min-max">
        <p>{capitalizedDescription}.</p>
        <p>
          {min}°—{max}°
        </p>
      </div>

      <div className="wind-humidity">
        <p>Vento: {wind}m/s</p>
        <p>Humidade: {humidity}%</p>
      </div>
    </div>
  )
}

export default CurrentDayWeather
