import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      setCities(data);
      setIsLoading(false);
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    setIsLoading(true);
    const res = await fetch(`${BASE_URL}/cities/${id}`);
    const data = await res.json();
    setCities(data);
    setIsLoading(false);
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  return context;
}
export { CitiesProvider, useCities };

CitiesProvider.propTypes = {
  children: PropTypes.string.isRequired,
};
