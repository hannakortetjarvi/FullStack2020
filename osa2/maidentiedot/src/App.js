import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

/**
 * Component for showing country's weather information
 */
const WeatherInfo = ({country}) => {
  const [ weather, setWeather ] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY // api_key is given in the command prompt at the same time when npm starts

  const weatherUrl = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`

  // Effect-hook; gets specific country capital's weather data (the capital is determinated in the weatherUrl)
  useEffect(() => {axios.get(weatherUrl).then(response => {setWeather(response.data)})}, [weatherUrl])

  if (weather === null) return <p>Loading...</p>
  // Loading the weather information is successful -->
  return (
    <>
	  <p> <b>Temperature:</b> {weather.current.temperature} Celsius</p>
	  <img alt={`weathericon`} src={weather.current.weather_icons[0]} />
	  <p> <b>Wind:</b> {weather.current.wind_speed} kmph direction {weather.current.wind_dir} </p>
    </>
  )
}

/**
 * Component for showing country data + filters country-list
 */
const Content = ({countries, input, showCountryInfo}) => {
  const shown = countries.filter(country => country.name.toLowerCase().includes(input.toLowerCase()))

  // More than 10 countries
  if (shown.length > 10) return <p>Too many matches, specify another filter</p>
  // Only one country
  else if (shown.length === 1) return <Country country={shown[0]}/>
  // 1 < countries <= 10
  else return (
    <>
      {shown.map(country => <ManyCountries key={country.name} country={country} showCountryInfo={showCountryInfo}/>)}
    </>
  )
}

/**
 * Component that renders singular country's information and weather
 */
const Country = ({country}) => {
  return (
    <>
      <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
      <h2>Languages</h2>
        <ul>{country.languages.map(language => <li key={language.name}> {language.name} </li>)}</ul>
        <img alt={`flagimage`} src={country.flag} height={100} />
      <h2>Weather in {country.capital}</h2>
        <WeatherInfo country={country}/>
    </>
  )
}

/**
 * Component for rendering country's name when there's shown (1 < country <= 10) countries
 */
const ManyCountries = ({country, showCountryInfo}) => <li>{country.name} <button value={country.name} onClick={showCountryInfo}>show</button></li>

/**
 * Application
 */
const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ input, setInput ] = useState('')

  // Effect-hook; gets data of the countries
  useEffect(() => {axios.get(`https://restcountries.eu/rest/v2/all`).then(response => setCountries(response.data))}, [])

  // Event-handler for filtering the countries by user's input
  const handleInput = (event) => {
    setInput(event.target.value)
  }

  // Event-handler for showing chosen country's data by using chosen country's name as a filter
  const showCountryInfo = (event) => {
	setInput(event.target.value)
  }

  return (
    <div>
      <p>Find countries: <input value={input} onChange={handleInput}/> </p>
      <Content countries={countries} input={input} showCountryInfo={showCountryInfo}/>
    </div>
  )
}

export default App
