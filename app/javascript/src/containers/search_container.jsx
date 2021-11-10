import React, { useEffect, useState } from 'react';
import SearchResults from '../components/search_results';
import SearchForm from '../components/search_form';

const SearchContainer = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchWasTriggered, setSearchWasTriggered] = useState(false);

  useEffect(() => {
    if (searchWasTriggered) {
      setSearchWasTriggered(false);
    }
  }, [searchValue]);

  const resetSearchValueAndResults = () => {
    setSearchValue('');
    setSearchResults([]);
  };

  const handleSearchRequest = async (e) => {
    e.preventDefault();

    // TODO: Disallow subsequent requests if searchValue is the same as before

    const response = await fetch(`/api/words?search=${searchValue}`);
    const data = await response.json();

    setSearchResults(data);
    setSearchWasTriggered(true);
  };

  const handleWordDeleting = async (id) => {
    // TODO: Extract to the helper
    const csrfToken = document.getElementsByName('csrf-token')[0].content;
    const response = await fetch(`/api/words/${id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-TOKEN': csrfToken,
      },
    });

    if (response.ok) {
      setSearchResults(searchResults.filter((word) => word.id !== id));
      // TODO: Replace alerts later
      alert('Word was successfully deleted!');
    } else {
      alert('Something went wrong!');
    }
  };

  const handleWordCreating = async () => {
    // TODO: Extract to the helper
    const csrfToken = document.getElementsByName('csrf-token')[0].content;
    const response = await fetch(`/api/words`, {
      method: 'POST',
      headers: {
        'X-CSRF-TOKEN': csrfToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word: { text: searchValue } }),
    });

    const data = await response.json();

    if (data.id) {
      // TODO: Replace alerts later
      alert('Word was successfully created!');
      setSearchResults([...searchResults, data])
      setSearchValue('');
      // TODO: Move focus to input after removing
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
        onClearBtnCLick={resetSearchValueAndResults}
      />
      <SearchResults
        words={searchResults}
        onWordDeleteClick={handleWordDeleting}
        searchWasTriggered={searchWasTriggered}
        searchValue={searchValue}
        onAddWordBtnClick={handleWordCreating}
      />
    </div>
  );
};

export default SearchContainer;
