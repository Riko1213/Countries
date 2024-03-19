// CountryDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import "./CountryDetails.css";

const CountryDetails = () => {
  const [country, setCountry] = useState(null);
  const { code } = useParams();

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
        setCountry(response.data[0]);
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };

    fetchCountryDetails();
  }, [code]);

  return (
    <div className='container'><Link to="/" className="back-button">Back to Country List</Link>
      {country ? (
        <div className='c'>
          <input
          type="submit"
          value={country.latlng}
          formTarget="_blank"
          className="button"
        />
          <img src={country.flags.png}  />
          <h1>{country.name.common}</h1>
          <h2>Нийт хүн ам: {country.population}</h2>
          <h2>Нийслэл хот: {country.capital}</h2>
          <h2>Газар нутгийн хэмжээ: {country.area} м^2</h2>
          <h2>Тив: {country.region}</h2>
          <h2>Бүсчлэл: {country.subregion}</h2>
          <h2>Цагийн бүс: {country.timezones}</h2>
          <h2>Хаяглал {country.tld}</h2>
          <h2>Уртраг Өргөрөг: </h2>
          <form action={country.maps.googleMaps}>
        
      </form>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CountryDetails;
