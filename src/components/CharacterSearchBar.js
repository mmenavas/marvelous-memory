import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input'
import { findCharacterByName } from '../services/api';
import { CharacterList } from './CharacterList';
import { Spinner } from './Spinner';

export function CharacterSearchBar({ helpText='', placeholder = '', onCharacterClick, charactersToHide = [] }) {
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [hasResults, setHasResults] = useState(true)

  async function handleSearch(name) {
    setIsLoading(true)
    setHasError(false)
    setHasResults(true)
    try {
      const data = await findCharacterByName(name)
      setCharacters(data)
      setHasResults(data.length > 0)
    }
    catch (e) {
      setHasError(true)
    }
    setIsLoading(false)
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
      {hasError && <p className='p-4 bg-orange mb-4'>Something went wrong. Please try again.</p>}
      {isLoading && <p className='p-4 text-center'><Spinner /></p>}
      {!hasResults && <p className='p-4'>No results were found. Try entering different keywords (e.g. spider).</p>}
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
