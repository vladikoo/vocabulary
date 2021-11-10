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

  const handleWordDelete = async (id) => {
    const csrfToken = document.getElementsByName('csrf-token')[0].content;
    const response = await fetch(`/api/words/${id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-TOKEN': csrfToken,
      },
    });

    if (response.ok) {
      setSearchResults(searchResults.filter((word) => word.id !== id));
      alert('Word was successfully deleted!');
    } else {
      alert('Something went wrong!');
    }
  };

  return (
    <div className="search-container">
      <SearchForm
        onSubmit={handleSearchRequest}
        inputValue={searchValue}
        onInputChange={setSearchValue}
      />
      <SearchResults
        words={searchResults}
        onWordDeleteClick={handleWordDelete}
      />
    </div>
  );
};

export default SearchContainer;
