import axios from 'axios'

const API_KEY = '14417847eceb4c9b6a9c297167ff1113'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

export const getWeather = (city) => {
  return axios.get(`${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`)
}

export const getForecast = (city) => {
  return axios.get(`${BASE_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`)
}

export const getUserLocation = () => {
  return axios.get('https://ipapi.co/json/')
}

export const getCitySuggestions = (searchQuery) => {
  const url = `https://api.openweathermap.org/data/2.5/find?q=${searchQuery}&type=like&sort=population&cnt=5&appid=${API_KEY}`
  return axios.get(url).then((response) =>
    response.data.list.map((item) => ({
      id: item.id,
      name: item.name
    }))
  )
}
