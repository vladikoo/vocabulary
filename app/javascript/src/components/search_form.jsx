import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const SearchForm = forwardRef((props, ref) => {
  const { onSubmit, inputValue, onInputChange, onClearBtnCLick } = props;

  return (
    <form onSubmit={onSubmit}>
      <input
        ref={ref}
        name="search"
        placeholder="Enter word for search..."
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        maxLength={30}
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
};

SearchForm.defaultProps = {
  inputValue: '',
};

export default SearchForm;
