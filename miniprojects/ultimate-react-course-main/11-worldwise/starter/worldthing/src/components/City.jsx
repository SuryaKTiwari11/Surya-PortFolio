/* eslint-disable no-unused-vars */
// import styles from "./City.module.css";

import { useParams, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  // TEMP DATA

  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div></div>
    </div>
  );
}

City.propTypes = {
  cityName: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
};

export default City;
