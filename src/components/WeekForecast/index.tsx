import React from 'react'
import weekDays from '../../consts/weekDays'
import './index.scss'

type Props = {
  weekForecast: {
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
}

const WeekForecast: React.FC<Props> = ({ weekForecast }) => {
  return (
    <table className="WeekForecast">
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
  )
}

export default WeekForecast
