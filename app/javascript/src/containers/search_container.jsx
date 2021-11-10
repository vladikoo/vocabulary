import React, { useState } from 'react';
import SearchResults from '../components/search_results';
import SearchForm from '../components/search_form';

const SearchContainer = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchRequest = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/words?search=${searchValue}`);
    const data = await response.json();

    setSearchResults(data);
  };

  return (
    <div className="search-container">
      <SearchForm
        onSubmit={handleSearchRequest}
        inputValue={searchValue}
        onInputChange={setSearchValue}
      />
      <SearchResults words={searchResults} />
    </div>
  );
};

export default SearchContainer;
