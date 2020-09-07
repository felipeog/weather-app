import React from 'react'
import months from '../../consts/months'
import weekDays from '../../consts/weekDays'
import './index.scss'

const CurrentDayWeather = ({ currentDay, cityName }) => {
  const date = new Date(currentDay.dt * 1000)
  const weekDay = weekDays[date.getDay()]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const temperature = Math.round(currentDay.temp.day)
  const description = currentDay.weather[0].description
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
        <p>{description}.</p>
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
