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
    );
  } else if (searchWasTriggered) {
    content = (
      <>
        <p>No search results for: <b>{searchValue}</b></p>
        <button
          type="button"
          onClick={onAddWordBtnClick}
        >
          Add Word
        </button>
      </>
    );
  }

  return (
    <div data-testid="search-results" className="search-results">
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
};

SearchResults.defaultProps = {
  words: [],
};

export default SearchResults;
