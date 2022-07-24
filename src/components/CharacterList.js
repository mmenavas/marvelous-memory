import React from 'react'
import PropTypes from 'prop-types';
import { Character } from './Character';

export function CharacterList({ characters, onRemoveClick }) {

  function handleRemoveClick(id) {
    onRemoveClick(id)
  }

  return (
    <div className='characterList bg-slate-800'>
      <p className='p-4 text-slate-100'>You have selected:</p>
      <ul className="flex flex-wrap">
        {
          characters.map((character, index) =>
            <li key={index} className="CharacterList__item m-2">
              <Character {...character} onRemove={handleRemoveClick}/>
            </li>
          )
        } 
      </ul>
    </div>
  )
}

CharacterList.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
  }),
  onRemoveClick: PropTypes.func
}