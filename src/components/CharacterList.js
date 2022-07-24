import React from 'react'
import PropTypes from 'prop-types';
import { Character } from './Character';

export function CharacterList({ label = '', characters, onItemClick, onItemRemoveClick, className }) {
  if (characters.length < 1) {
    return null
  }

  return (
    <div>
      { label && (<p className='p-4 text-slate-100'>{label}</p>) }
      <ul className="flex flex-wrap">
        {
          characters.map((character, index) =>
            <li key={index} className="m-2">
              <Character character={character} onClick={onItemClick} onRemove={onItemRemoveClick}/>
            </li>
          )
        } 
      </ul>
    </div>
  )
}

CharacterList.propTypes = {
  label: PropTypes.string,
  character: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
  }),
  onItemClick: PropTypes.func,
  onItemRemoveClick: PropTypes.func
}