import React from 'react';
import PropTypes from 'prop-types';

const Word = ({ text, onDeleteClick }) => (
  <li>
    {text} | <button type="button" onClick={onDeleteClick}>Delete</button>
  </li>
);

Word.propTypes = {
  text: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default Word;
