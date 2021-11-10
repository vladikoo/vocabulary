import React from 'react';
import PropTypes from 'prop-types';

const SearchResults = ({ words }) => (
  <div className="search-results">
    <ul>
      {words.map((word) => (
        <li key={word.id}>{word.text}</li>
      ))}
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
};

SearchResults.defaultProps = {
  words: [],
};

export default SearchResults;
