import React, { useState } from 'react'
import { useQuery } from 'react-query'
import CitySelect from '../../components/CitySelect'
import WeatherContent from '../../components/WeatherContent'
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
