import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input'
import { findCharacterByName } from '../services/api';
import { CharacterList } from './CharacterList';

export function CharacterSearchBar({ helpText='', placeholder = '', onCharacterClick, charactersToHide = [] }) {
  const [characters, setCharacters] = useState([])

  async function handleSearch(name) {
    const data = await findCharacterByName(name)
    setCharacters(data)
  }

  function handleCharacterClick(character) {
    onCharacterClick(character)
  }

  return(
    <div className='CharacterSearchBar'>
      <label className="relative block">
        <span className="">{helpText}</span>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          placeholder={placeholder}
          className="placeholder:italic placeholder:text-black block bg-white text-black w-full border rounded-md py-2 px-3 my-4 shadow-sm focus:outline-none focus:ring-1"
          onChange={(event) => handleSearch(event.target.value)}
        />
      </label>
      <CharacterList
        label='Add tiles to your board by clicking on the search results below:'
        characters={characters.filter(item => !charactersToHide.includes(item.id))}
        // characters={characters}
        onItemClick={handleCharacterClick}
      />
    </div>
  )
}

CharacterSearchBar.propTypes = {
  helpText: PropTypes.string,
  placeholder: PropTypes.string,
  onCharacterClick: PropTypes.func.isRequired
}
