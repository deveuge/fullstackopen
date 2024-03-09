import { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import CountryService from "./Components/CountryService";
import Result from "./Components/Result";

function App() {
  const [filterCountry, setFilterCountry] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    CountryService.getAll().then((response) => {
      setAllCountries(response);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilterCountry(event.target.value);
  };

  return (
    <>
      <Filter value={filterCountry} onChange={handleFilterChange} />
      <Result allCountries={allCountries} filterCountry={filterCountry} />
    </>
  );
}

export default App;
