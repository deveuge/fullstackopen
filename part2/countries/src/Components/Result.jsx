import { useState, useEffect } from "react";
import WeatherService from "./WeatherService";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    WeatherService.get(country.latlng[0], country.latlng[1]).then((response) => {
      setWeather(response);
    });
  }, []);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.keys(country.languages).map(function (key) {
          return <li key={key}>{country.languages[key]}</li>;
        })}
      </ul>
      <img src={country.flags.png} />
      <Weather weather={weather} />
    </>
  );
};

const Weather = ({ weather }) => {
  if (weather == null) return;
  return (
    <div>
      <p>
        Temperature: {weather.current["temperature_2m"]}
        {weather["current_units"]["temperature_2m"]}
      </p>
      <p>
        Wind: {weather.current["wind_speed_10m"]}
        {weather["current_units"]["wind_speed_10m"]}
      </p>
    </div>
  );
};

const ListResult = ({ country }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div key={country.name.common}>
      {country.name.common} <button onClick={handleShow}>{show ? "Hide" : "Show"}</button>
      {show ? <Country country={country} /> : <></>}
    </div>
  );
};

const Result = ({ allCountries, filterCountry }) => {
  if (filterCountry.length === 0) return;
  const filteredCoutries = allCountries.filter((c) => c.name.common.toLowerCase().includes(filterCountry.toLowerCase()));

  if (filteredCoutries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCoutries.length > 1) {
    const countryList = filteredCoutries.map((c) => {
      return <ListResult key={c.name.common} country={c} />;
    });
    return <div>{countryList}</div>;
  } else if (filteredCoutries.length === 1) {
    return <Country country={filteredCoutries[0]} />;
  } else {
    return <p>No matches</p>;
  }
};

export default Result;
