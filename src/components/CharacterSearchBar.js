import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input'
import { findCharacterByName } from '../services/api';

export function CharacterSearchBar({ onResultClick }) {
  const [results, setResults] = useState([])

  async function handleSearch(name) {
    const data = await findCharacterByName(name)
    setResults(data)
  }

  function handleResultClick(result) {
    onResultClick(result)
  }

  return(
    <div className='CharacterSearchBar'>
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        className="CharacterSearchBar__input-field"
        onChange={(event) => handleSearch(event.target.value)}
      />
      <ul className="CharacterSearchBar__results">
        {
          results.map((result, index) =>
            <li key={index} className="result">
              <button onClick={() => handleResultClick(result)}>
                <img src={result.thumbnail} alt="" />
              </button>
            </li>
          )
        } 
      </ul>
    </div>
  )
}

CharacterSearchBar.propTypes = {
  onResultClick: PropTypes.func.isRequired
}
