interface Coords {
  lon: number
  lat: number
}

const getWeatherQuery = ({ lon, lat }: Coords) => {
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

export default getWeatherQuery
