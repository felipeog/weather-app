import React, { useState } from 'react'
import { useQuery } from 'react-query'
import CitySelect from '../../components/CitySelect'
import WeatherContent from '../../components/WeatherContent'
import getWeatherQuery from '../../utils/getWeatherQuery'
import './index.scss'

interface Coords {
  lon: number
  lat: number
}

interface CityOption {
  label: string
  value: number
  subLabel: string
  coords: Coords
}

const fetchWeather = async (key: string, coords: Coords) => {
  if (!coords) return null

  const { lon, lat } = coords
  const res = await fetch(getWeatherQuery({ lon, lat }))

  return res.json()
}

const Home = () => {
  const [city, setCity] = useState<CityOption | undefined>()
  const { data, status } = useQuery(['weather', city?.coords], fetchWeather, {
    cacheTime: 60 * 60 * 1000,
  })

  return (
    <div className="Home">
      <div className="container">
        <CitySelect setCity={setCity} />
        <WeatherContent status={status} data={data} city={city} />
      </div>
    </div>
  )
}

export default Home
