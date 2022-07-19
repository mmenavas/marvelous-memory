import React, { useState } from 'react';
import { MemoryGameBoard } from '@mmenavas/memory-game-react'
import { CharacterSearchBar } from './components/CharacterSearchBar';
import { CharacterList } from './components/CharacterList';

const screens = {
  home: 1,
  characterFinder: 2,
  memoryGame: 3
}

export default function App() {

  const [characters, setCharacters] = useState([])
  const [screen, setScreen] = useState(screens.home)

  function addCharacter(character) {
    setCharacters([...characters, character])
  }

  function removeCharacter(id) {
    setCharacters(characters.filter(character => character.id !== id))
  }

  return (
    <div className='bg-amber-500 h-screen grid place-items-center'>
      {screen === screens.home && (
        <div className='w-96'>
          <h1 className='text-4xl font-semibold text-white p-4'>Marvelous Memory</h1>
          <p className='text-xl'>Welcome! Build a tile matching game by finding your favorite Marvel Comics characters and adding them to your board.</p>
          <button
            className='block bg-orange-500 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-full my-4'
            onClick={() => setScreen(screens.characterFinder)}
          >Build Board</button>
        </div>
      )}
      {screen === screens.characterFinder && (
        <div>
          <CharacterSearchBar onResultClick={addCharacter} label='Find a marvel character and ad' />
          <CharacterList characters={characters} onRemoveClick={removeCharacter}/>
          <button
            className='block bg-orange-500 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-full my-4'
            onClick={() => setScreen(screens.memoryGame)}
          >Start Game</button>
        </div>
      )}
      {screen === screens.memoryGame && (
        <MemoryGameBoard
          values={characters}
          timeoutDuration={ 1000 }
          TileNode={(props) => <img src={props.value.image} alt={props.value.name} />}
          ConcealedTileNode={(props) => <h2>???</h2>}
        />
      )}
    </div>
  )

}