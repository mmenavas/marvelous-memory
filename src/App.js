import React, { useState } from 'react';
import { MemoryGameBoard } from '@mmenavas/memory-game-react'
import { MessageProvider } from '@mmenavas/memory-game-react'
import { CharacterSearchBar } from './components/CharacterSearchBar';
import { CharacterList } from './components/CharacterList';
import { Character } from './components/Character';
import { ConcealedCharacter } from './components/ConcealedCharacter';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import  translations from './assets/translations.json'


const flipATileTranslations = new MessageProvider(translations.flipATileTranslations)
const appTranslations = new MessageProvider(translations.appTranslations)
const supportedLanguages = [
  {
    name: 'English',
    code: 'en'
  },
  {
    name: 'Español',
    code: 'es'
  },
  // {
  //   name: 'Português',
  //   code: 'pt'
  // }
]

const screens = {
  home: 1,
  characterFinder: 2,
  memoryGame: 3
}

export default function App() {

  const [characters, setCharacters] = useState([])
  const [screen, setScreen] = useState(screens.home)
  const [language, setLanguage] = useState('en')

  function addCharacter(character) {
    setCharacters([...characters, character])
  }

  function removeCharacter(id) {
    setCharacters(characters.filter(character => character.id !== id))
  }
  function getAppTranslation(msgCode) {
    return appTranslations.findMessage(msgCode, language)
  }

  return (
    <div className='absolute min-w-full min-h-full flex justify-center items-center bg-darkBlue p-4'>
      {screen === screens.home && (
        <div className='lg-2/3 xl:w-1/2 2xl:w-1/3'>
          <LanguageSwitcher
            language={language}
            languages={supportedLanguages}
            onChange={setLanguage}
          /> 
          <h1 className='text-6xl font-semibold mb-6 text-center uppercase '>Marvelous Memory</h1>
          <p className='text-xl mb-8 font-serif border p-4'>{getAppTranslation('appDescription')}</p>
          <button
            className='block w-full bg-blue font-bold py-4 px-8 rounded-full'
            onClick={() => setScreen(screens.characterFinder)}
          >{getAppTranslation('goToCharacterFinder')}</button>
        </div>
      )}
      {screen === screens.characterFinder && (
        <div className='lg-2/3 xl:w-1/2 2xl:w-1/3'>
          <CharacterSearchBar charactersToHide={characters.map(item => item.id)} onCharacterClick={addCharacter} helpText='Build a memory game board by selecting your favorite MCU characters:' placeholder='Find an MCU character'/>
          <CharacterList characters={characters} onItemRemoveClick={removeCharacter} label='Your board:' />
          <button
            className='block w-full font-bold py-4 px-8 rounded-full bg-blue mb-4'
            onClick={() => setScreen(screens.memoryGame)}
          >Start Game</button>
          <button
            className='block w-full font-bold py-4 px-8 rounded-full border'
            onClick={() => setScreen(screens.home)}
          >Go Back</button>
        </div>
      )}
      {screen === screens.memoryGame && (
        <div className=''>
          <MemoryGameBoard
            values={characters}
            messageProvider={flipATileTranslations}
            language={language}
            timeoutDuration={ 1000 }
            TileNode={(props) => <Character character={props.value}/>}
            ConcealedTileNode={(props) => <ConcealedCharacter />}
          />
          <button
            className='block w-full font-bold py-4 px-8 rounded-full border mt-8'
            onClick={() => setScreen(screens.characterFinder)}
          >Go Back</button>
        </div>
      )}
    </div>
  )

}