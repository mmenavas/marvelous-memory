import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {DelayInput} from 'react-delay-input';
import { findCharacterByName } from '../services/api';
import './CharacterSearchBar.css';

export function CharacterSearchBar({ addCharacter }) {
  const [results, setResults] = useState([])

  async function handleSearch(name) {
    const data = await findCharacterByName(name)
    setResults(data)
  }

  function handleClickOnResult(result) {
    addCharacter(result)
  }

  return(
    <div className='CharacterSearchBar'>
      <DelayInput
        minLength={2}
        delayTimeout={300}
        className="CharacterSearchBar__input-field"
        onChange={(event) => handleSearch(event.target.value)}
      />
      <ul className="CharacterSearchBar__results">
        {
          results.map((result, index) =>
            <li key={index} className="result">
              <button onClick={() => handleClickOnResult(result)}>
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
  addCharacter: PropTypes.func.isRequired
}

      {/* <div className={"search" + (!this.state.start_game ? "" : " hide")}>
        <ul className="chosen-cards">
          {
            this.state.cards
            .filter(result => !result.isClone)
            .map((result, index) =>
              <li key={index} className="chosen-cards__item">
                <img src={result.thumbnail} alt="" />
                <button onClick={() => this.removeCard(result.id)}>Remove</button>
              </li>
            )
          } 
        </ul>
        <DelayInput
          minLength={2}
          delayTimeout={300}
          className="search__box"
          onChange={(event) => this.handleSearch(event.target.value)}
        />
        <ul className="search__results">
          {
            this.state.search_results.map((result, index) =>
              <li key={index} className="result">
                <img src={result.thumbnail} alt="" />
                {result.name}
                <button onClick={() => this.addCard(result)}>Add</button>
              </li>
            )
          } 
        </ul>
      </div> */}