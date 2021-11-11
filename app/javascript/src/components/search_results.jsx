import React from 'react';
import PropTypes from 'prop-types';
import Word from "./word";

const SearchResults = (props) => {
  const {
    words,
    onWordDeleteClick,
    searchWasTriggered,
    searchValue,
    onAddWordBtnClick,
  } = props;

  let content = null;

  if (words.length) {
    content = (
      <>
        <h3>Search Results</h3>
        <ul>
          {words.map((word) =>
            <Word
              key={word.id}
              id={word.id}
              text={word.text}
              onDeleteClick={() => onWordDeleteClick(word.id)}
            />
          )}
        </ul>
      </>
    );
  } else if (searchWasTriggered) {
    content = (
      <div data-testid="no-search-results">
        <p>No search results for: <b>{searchValue}</b></p>
        <button
          type="button"
          onClick={onAddWordBtnClick}
        >
          Add Word
        </button>
      </div>
    );
  }

  return (
    <div className="search-results">
      {content}
    </div>
  );
};

SearchResults.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
    }).isRequired,
  ),
  onWordDeleteClick: PropTypes.func.isRequired,
  searchWasTriggered: PropTypes.bool.isRequired,
  searchValue: PropTypes.string,
  onAddWordBtnClick: PropTypes.func.isRequired,
};

SearchResults.defaultProps = {
  words: [],
  searchValue: '',
};

export default SearchResults;
