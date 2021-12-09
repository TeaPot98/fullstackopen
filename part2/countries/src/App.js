import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Search = ({handleSearchChange}) => {
  return (
    <div>
      find countries <input onChange={handleSearchChange} />
    </div>
  )
}

const Countries = ({countries, showCountryDetails, weather_api_key, weather, setWeather}) => {

  if(countries.length > 10) {
    console.log('too many matches')
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 1 && Object.keys(weather).length === 0 && weather.constructor === Object) {
    console.log('only one country and weather is empty')

    console.log(countries[0])

    axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: countries[0].capital[0],
        appid: weather_api_key,
        units: 'metric',
      }
    }).then(response => {
        setWeather(response.data)
        console.log(response.data)
      }
    )
    
    return <div></div>
    
  } else if (countries.length === 1 && Object.keys(weather).length !== 0 && weather.constructor === Object) {
    console.log('only one country and weather is not empty')
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        <div>capital {countries[0].capital[0]}</div>
        <div>population {countries[0].population}</div>
        <h2>languages</h2>
        <ul>
          {Object.values(countries[0].languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={countries[0].flags.png}></img>
        <h2>Weather in {countries[0].capital[0]}</h2>
        <div><strong>temperature: </strong>{weather.main.temp} Celsius</div>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
        <div><strong>wind: </strong>{weather.wind.speed} m/s direction {weather.wind.deg} degrees</div>
      </div>
    )
  }
  console.log('display country list - exit return')
  return (
    <ul>
      {countries.map((country, index) => {
        return (
          <li key={country.name.official}>
            {country.name.common} <button onClick={() => showCountryDetails(index)}>show</button>
          </li>
        )} 
      )}
    </ul>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchString, setSearchString] = useState('')
  const [weather, setWeather] = useState({})

  const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY
  
  const filteredCountries = searchString === '' ? [] : countries.filter(country => country.name.common.toLowerCase().includes(searchString.toLowerCase()))
  
  const countriesToShow = filteredCountries;
  
  const showCountryDetails = (index) => {
    setSearchString(filteredCountries[index].name.common)
  }
  
  const handleSearchChange = (event) => {
      event.preventDefault()
      console.log(event.target.value)
      setWeather({})
    setSearchString(event.target.value)
  }

  // name.common - name of country
  // capital - capital (as an array ??)
  // population
  // languages (as an object)
  // flags (as object) .png, .svg
  
  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all')
    .then((response) => {
      const countriesData = response.data; 
      console.log(countriesData)
      setCountries(countriesData)
      } 
    )
  }
    
  useEffect(hook, [])

  return (
    <div>
      {/* <div>{process.env.REACT_APP_WEATHER_API_KEY}</div> */}
      <Search handleSearchChange={handleSearchChange} />
      <Countries countries={countriesToShow} showCountryDetails={showCountryDetails} weather_api_key={weather_api_key} weather={weather} setWeather={setWeather}/>
    </div>
  )
}

export default App;