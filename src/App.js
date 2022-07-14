import React, { useEffect, useState } from 'react';
import { MemoryGameBoard } from '@mmenavas/memory-game-react'
import { CharacterSearchBar } from './components/CharacterSearchBar';
import { CharacterList } from './components/CharacterList';
import './App.css';

export default function App() {

  const [characters, setCharacters] = useState([])

  function addCharacter(character) {
    setCharacters([...characters, character])
  }

  function removeCharacter(id) {
    setCharacters(characters.filter(character => character.id !== id))
  }

  return (
    <div className="game">
      <h1>Marvelous Memory</h1>
      <CharacterSearchBar onResultClick={addCharacter} />
      <CharacterList characters={characters} onRemoveClick={removeCharacter}/>
      <MemoryGameBoard values={characters.map(character => character.id)} />
    </div>
  )

}