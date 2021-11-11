import React from 'react';
import PropTypes from 'prop-types';

const Word = ({ id, text, onDeleteClick }) => {
  const deleteIcon = (
    <i
      data-testid="delete-icon"
      className="cross-icon fa fa-close"
      title="Delete Word"
      onClick={onDeleteClick}
    />
  );

  return (
    <li data-testid={`word-${id}`}>
      {text} {deleteIcon}
    </li>
  );
};

Word.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default Word;
