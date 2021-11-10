import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({ onSubmit, inputValue, onInputChange }) => (
  <form onSubmit={onSubmit}>
    <input
      name="search"
      placeholder="Enter word for search..."
      value={inputValue}
      onChange={(e) => onInputChange(e.target.value)}
    />
    <button
      type="submit"
      disabled={!Boolean(inputValue)}
    >
      Submit
    </button>
  </form>
);

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  inputValue: '',
};

export default SearchForm;
