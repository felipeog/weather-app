import React from 'react'
import weekDays from '../../consts/weekDays'
import './index.scss'

const WeekForecast = ({ weekForecast }) => {
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
