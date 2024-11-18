import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [placeholder, setPlaceholder] = useState('Search Books Here');

  const handleSelect = (option) => {
    if (option === 'name') {
      setPlaceholder('Search by Book Name');
    } else if (option === 'category') {
      setPlaceholder('Search by Category');
    }
  };

  return (
    <div className="input-group mb-3 search-bar">
      <div className="input-group-prepend">
        <button
          className="btn btn-danger dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          id="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Category
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdown">
          <li><a className="dropdown-item" href="#" onClick={() => handleSelect('name')}>Search by Name</a></li>
          <li><a className="dropdown-item" href="#" onClick={() => handleSelect('category')}>Search by Category</a></li>
        </ul>
      </div>
      <input
        type="text"
        className="form-control search-input"
        placeholder={placeholder}
        aria-label={placeholder}
        aria-describedby="button-addon2"
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary btnsearch" type="button" id="button-addon2">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
