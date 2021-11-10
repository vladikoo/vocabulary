import React from 'react';
import PropTypes from 'prop-types';
import Word from "./word";

const SearchResults = ({ words, onWordDeleteClick }) => (
  <div className="search-results">
    <ul>
      {words.map((word) =>
        <Word
          key={word.id}
          text={word.text}
          onDeleteClick={() => onWordDeleteClick(word.id)}
        />
      )}
    </ul>
  </div>
);

SearchResults.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
    }).isRequired,
  ),
  onWordDeleteClick: PropTypes.func.isRequired,
};

SearchResults.defaultProps = {
  words: [],
};

export default SearchResults;
