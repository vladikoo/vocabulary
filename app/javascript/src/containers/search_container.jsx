import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../axios';
import SearchResults from '../components/search_results';
import SearchForm from '../components/search_form';

const SearchContainer = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchWasTriggered, setSearchWasTriggered] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

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

    const response = await axios.get(`/api/words?search=${searchValue}`);

    setSearchResults(response.data);
    setSearchWasTriggered(true);
  };

  const handleWordDeleting = async (id) => {
    try {
      await axios.delete(`/api/words/${id}`);

      setSearchResults(searchResults.filter((word) => word.id !== id));
      toast.success('Word was successfully deleted!');
    } catch (e) {
      toast.error('Something went wrong!');
    }
  };

  const handleWordCreating = async () => {
    const params = { word: { text: searchValue } };

    try {
      const response = await axios.post(`/api/words`, params);

      setSearchResults([...searchResults, response.data])
      setSearchValue('');
      searchInputRef.current.focus();
      toast.success('Word was successfully created!');
    } catch (e) {
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
        searchWasTriggered={searchWasTriggered}
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
