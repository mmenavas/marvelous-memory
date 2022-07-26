import React, { useState } from 'react';
import { MemoryGameBoard } from '@mmenavas/memory-game-react'
import { CharacterSearchBar } from './components/CharacterSearchBar';
import { CharacterList } from './components/CharacterList';
import { Character } from './components/Character';
import { ConcealedCharacter } from './components/ConcealedCharacter';

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
    <div className=''>
      {screen === screens.home && (
        <div className='w-full'>
          <p className='text-2xl text-slate-900 text-left'>Hey there! Welcome to</p>
          <h1 className='text-3xl font-semibold text-white mb-2 text-center'>Marvelous Memory</h1>
          <p className='text-base text-slate-900 text-right mb-4'>I'm glad you're here!</p>
          <hr className='mb-4'/>
          <p className='text-base  text-slate-900 max-w-xl'>Here's the deal: You can find your favorite characters from the Marvel Comics Universe&reg; to build a flip-a-tile game so you can exercise your memory skills. Are you up for the challenge?</p>
          <button
            className='block bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-8 rounded-full my-4'
            onClick={() => setScreen(screens.characterFinder)}
          >Build Board</button>
        </div>
      )}
      {screen === screens.characterFinder && (
        <div>
          <CharacterSearchBar charactersToHide={characters.map(item => item.id)} onCharacterClick={addCharacter} helpText='Build a memory game board by selecting your favorite MCU characters:' placeholder='Find an MCU character'/>
          <CharacterList characters={characters} onItemRemoveClick={removeCharacter} label='Your board' />
          <button
            className='block bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-8 rounded-full my-4'
            onClick={() => setScreen(screens.memoryGame)}
          >Start Game</button>
          <button
            className='block bg-gray-600 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full my-4'
            onClick={() => setScreen(screens.home)}
          >Go Back</button>
        </div>
      )}
      {screen === screens.memoryGame && (
        <div>
          <MemoryGameBoard
            values={characters}
            timeoutDuration={ 1000 }
            TileNode={(props) => <Character character={props.value}/>}
            ConcealedTileNode={(props) => <ConcealedCharacter />}
          />
          <button
            className='block bg-gray-600 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full my-4'
            onClick={() => setScreen(screens.characterFinder)}
          >Go Back</button>
        </div>
      )}
    </div>
  )

}