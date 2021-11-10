import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import SearchResults from '../components/search_results';
import SearchForm from '../components/search_form';
import csrfToken from '../utils';

const SearchContainer = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchWasTriggered, setSearchWasTriggered] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchWasTriggered) {
      setSearchWasTriggered(false);
    }
  }, [searchValue]);

  const resetSearchValueAndResults = () => {
    setSearchValue('');
    setSearchResults([]);
    searchInputRef.current.focus();
  };

  const handleSearchRequest = async (e) => {
    e.preventDefault();

    if (searchWasTriggered) return null;

    const response = await fetch(`/api/words?search=${searchValue}`);
    const data = await response.json();

    setSearchResults(data);
    setSearchWasTriggered(true);
  };

  const handleWordDeleting = async (id) => {
    const response = await fetch(`/api/words/${id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-TOKEN': csrfToken(),
      },
    });

    if (response.ok) {
      setSearchResults(searchResults.filter((word) => word.id !== id));
      toast.success('Word was successfully deleted!');
    } else {
      toast.error('Something went wrong!');
    }
  };

  const handleWordCreating = async () => {
    const response = await fetch(`/api/words`, {
      method: 'POST',
      headers: {
        'X-CSRF-TOKEN': csrfToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word: { text: searchValue } }),
    });

    const data = await response.json();

    if (data.id) {
      toast.success('Word was successfully created!');
      setSearchResults([...searchResults, data])
      setSearchValue('');
      searchInputRef.current.focus();
    } else {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="search-container">
      <SearchForm
        onSubmit={handleSearchRequest}
        inputValue={searchValue}
        onInputChange={setSearchValue}
        onClearBtnCLick={resetSearchValueAndResults}
        ref={searchInputRef}
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
