import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({ onSubmit, inputValue, onInputChange, onClearBtnCLick }) => {
  const inputRef = useRef(null);

  return (
    <form onSubmit={onSubmit}>
      <input
        name="search"
        placeholder="Enter word for search..."
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        ref={inputRef}
      />
      <button
        type="submit"
        disabled={!Boolean(inputValue)}
      >
        Submit
      </button>
      <button
        type="button"
        disabled={!Boolean(inputValue)}
        onClick={() => {
          onClearBtnCLick();
          inputRef.current.focus();
        }}
      >
        Clear
      </button>
    </form>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onClearBtnCLick: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  inputValue: '',
};

export default SearchForm;
