import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const SearchForm = forwardRef((props, ref) => {
  const {
    onSubmit,
    inputValue,
    onInputChange,
    onClearBtnCLick,
    searchWasTriggered,
  } = props;

  return (
    <form onSubmit={onSubmit} className="search-form">
      <input
        ref={ref}
        type="text"
        name="search"
        placeholder="Enter word for search..."
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        maxLength={30}
      />
      <button
        type="submit"
        disabled={!inputValue || searchWasTriggered}
      >
        Submit
      </button>
      <button
        type="button"
        disabled={!inputValue}
        onClick={onClearBtnCLick}
      >
        Clear
      </button>
    </form>
  );
});

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onClearBtnCLick: PropTypes.func.isRequired,
  searchWasTriggered: PropTypes.bool.isRequired,
};

SearchForm.defaultProps = {
  inputValue: '',
};

SearchForm.displayName = 'SearchForm';

export default SearchForm;
