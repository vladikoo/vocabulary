import React from 'react';
import PropTypes from 'prop-types';

const Word = ({ id, text, onDeleteClick }) => (
  <li data-testid={`word-${id}`}>
    {text} <button type="button" onClick={onDeleteClick}>Delete</button>
  </li>
);

Word.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default Word;
