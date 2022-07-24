import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input'
import { findCharacterByName } from '../services/api';

export function CharacterSearchBar({ helpText='', placeholder = '', onResultClick }) {
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
      <label className="relative block">
        <span className="">{helpText}</span>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          placeholder={placeholder}
          className="CharacterSearchBar__input-field placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 my-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          onChange={(event) => handleSearch(event.target.value)}
        />
      </label>
      <ul className="CharacterSearchBar__results flex flex-wrap w-full">
        {
          results.map((result, index) =>
            <li key={index} className="result p-1">
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
  helpText: PropTypes.string,
  placeholder: PropTypes.string,
  onResultClick: PropTypes.func.isRequired
}
