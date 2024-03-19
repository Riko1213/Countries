import React from "react";
import {
  Link
} from "react-router-dom";
import "./Country.css";

const Country = ({ name,  flagImg, code }) => {
  return (
    <div className="country">
      <div className="flag_container">
        <img src={flagImg} alt={name} />
      </div>

      <h2 className="name">{name}</h2>

      <div className="country_details">
        <p>
          <span className="bold">Code: {code}</span> 
        </p>
      </div>
        <Link to={`/CountryDetails/${code}`}>
          <button className="button">Дэлгэрэнгүй</button>
        </Link>
    </div>
  );
};

export default Country;