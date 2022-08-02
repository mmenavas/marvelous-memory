import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input'
import  { XIcon } from '@heroicons/react/outline'
import { findCharacterByName } from '../services/api';
import { CharacterList } from './CharacterList';
import { Spinner } from './Spinner';

export function CharacterSearchBar({ helpText='', placeholder = '', resultsMsg = '', errorMsg = '', noResultsMsg = '', onCharacterClick, charactersToHide = [] }) {
  const [value, setValue] = useState('')
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [hasResults, setHasResults] = useState(true)

  async function handleSearch(name) {
    setValue(name)
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

  function clearSearchBox() {
    setValue('')
    setCharacters([])
  }

  return(
    <div className='CharacterSearchBar'>
      <label className="relative block">
        <span className="">{helpText}</span>
      </label>
      <div className='relative'>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          placeholder={placeholder}
          value={value}
          className="placeholder:italic placeholder:text-black block bg-white text-black w-full border rounded-md py-2 px-3 my-4 shadow-sm focus:outline-none focus:ring-1"
          onChange={(event) => handleSearch(event.target.value)}
        />
        { value && <button className='absolute right-3 top-3 w-5 h-5 z-10 rounded text-black' onClick={() => clearSearchBox()}><XIcon  /></button> }
      </div>
      {hasError && <p className='p-4 bg-orange mb-4'>{errorMsg}</p>}
      {isLoading && <p className='p-4 text-center'><Spinner /></p>}
      {!hasResults && <p className='p-4'>{noResultsMsg}</p>}
      <CharacterList
        label={resultsMsg}
        characters={characters.filter(item => !charactersToHide.includes(item.id))}
        onItemClick={handleCharacterClick}
      />
    </div>
  )
}

CharacterSearchBar.propTypes = {
  helpText: PropTypes.string,
  placeholder: PropTypes.string,
  onCharacterClick: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
  resultsMsg: PropTypes.string,
  noResultsMsg: PropTypes.string,
  charactersToHide: PropTypes.arrayOf(PropTypes.number)
}
