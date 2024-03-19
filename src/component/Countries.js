import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Country from "./Country";
import page from "./page.css";

import "./Countries.css";

const Countries = () => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = searchTerm
        ? `https://restcountries.com/v3.1/name/${searchTerm}`
        : "https://restcountries.com/v3.1/all";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Олдсонгүй");
      }

      const data = await response.json();
      setFilteredCountries(data);
      setCurrentPage(0);
      setErrorMsg("");
    } catch (error) {
      setFilteredCountries([]);
      setCurrentPage(0);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCountries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="countries">
      <h1>Дэлхийн улсууд</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Хайх"
          onChange={handleSearch}
        />
      </div>

      <div className="countries_grid">
        {loading ? (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            Уншиж байна...
          </p>
        ) : errorMsg ? (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>{errorMsg}</p>
        ) : filteredCountries.length === 0 ? (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            Олдсонгүй...
          </p>
        ) : (
          currentItems.map((country) => (
            <Country
              name={country.name.common}
              code={country.cca2}
              flagImg={country.flags.png}
            />
          ))
        )}
      </div>
      <div className={page.pagination}>
      <ReactPaginate
        previousLabel={"өмнөх хуудас"}
        nextLabel={"дараагийн хуудас"}
        breakLabel={"..."}
        pageCount={Math.ceil(filteredCountries.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      /></div>
    </div>
  );
};

export default Countries;
