import React from 'react'
import PropTypes from 'prop-types';

export function CharacterList({ characters, onRemoveClick }) {

  function handleRemoveClick(id) {
    onRemoveClick(id)
  }

  return (
    <ul className="characterList">
      {
        characters.map((character, index) =>
          <li key={index} className="CharacterList__item">
            <img src={character.thumbnail} alt="" />
            <button onClick={() => handleRemoveClick(character.id)}>Remove</button>
          </li>
        )
      } 
    </ul>
  )
}

CharacterList.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
  }),
  onRemoveClick: PropTypes.func
}