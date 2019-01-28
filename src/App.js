import React, { Component } from 'react';
import {DelayInput} from 'react-delay-input';
import Card from './components/Card';
import './App.css';

class App extends Component {
  backendUrl = "http://0.0.0.0:5000/find/"

  statusMessages = {
    next_card: "Good! Now pick another card.",
    not_a_match: "Tough luck! Try again.",
    match: "Very well! Find the next pair.",
    win: "Excellent! You found them all.",
    select_characters: "Choose 3 or more Marvel characters.",
    first_card: "Select a card.",
  }

  constructor() {
    super();
    this.state = {
      cards: [],
      card1: -1,
      lock: false,
      matches: 0,
      message: this.statusMessages.select_characters,
      search_results: [],
      start_game: false
    }
  }

  /**
   * Rearrange elements in array.
   * 
   * @return shuffled array
   */
  shuffleCards(cards) {
    let shuffledCards = [];
    let randomIndex = 0;

    // Shuffle cards
    while (shuffledCards.length < cards.length) {

      // Random value between 0 and cards.length - 1
      randomIndex  = Math.floor(Math.random() * cards.length);

      // If element isn't false, add element to shuffled deck
      if (cards[randomIndex]) {
        
        // Add new element to shuffle deck
        shuffledCards.push(cards[randomIndex]);

        // Set element to false to avoid being reused
        cards[randomIndex] = false;
      }
    }

    return shuffledCards;
  }

  handleCardClick(index) {
    if (this.state.lock) {
      return false;
    }

    if (this.state.cards[index].isOn) {
      return false;
    }

    let cards = [...this.state.cards];
    cards[index].isOn = true;
    
    this.setState({
      cards: cards
    });

    let code = this.play(index);
    this.setState({
      message: this.statusMessages[code]
    });

  }

  play(index) {
    // Check if first card was selected.
    if (this.state.card1 === -1) {
      this.setState({
        card1: index
      })

      return 'next_card';
    }

    // If first card wasn't selected, then it's safe to assume that the second card was.
    let cards = [...this.state.cards];
    let card1 = this.state.card1;
    let matches = this.state.matches;

    // Check if cards don't match.
    if (cards[card1].id !== cards[index].id) {
      // Lock all cards
      this.setState({
        lock: true
      }) 
      setTimeout(() => {
        cards[card1].isOn = false;
        cards[index].isOn = false;
        
        this.setState({
          card1: -1,
          cards: cards,
          lock: false 
        }) 
      }, 1000);

      return 'not_a_match';
    }

    // Selected cards are a match.
    this.setState({
      card1: -1,
      matches: matches + 1
    });

    // Check if all matching cards have been found.
    if ((matches + 1) === (cards.length / 2)) {
      return 'win';
    }

    return 'match';
  }

  handleSearch(name) {
    if (name) {
      const url = this.backendUrl + name;
      fetch(url)
        .then(response => {
          // TODO: Handle failed request.
          // console.log(response);
          return response.json()
        })
        .then(items => { 
          this.setState({
            search_results: items
          });
        });
    }
    else {
          this.setState({
            search_results: []
          });
    }
  }

  addCard(character) {
    // TODO: Check that character doesn't already exist.
    // TODO: Don't show add button if character was already chosen.
    character.isOn = false;
    character.isClone = false;
    let clone = {
      ...character,
      isClone: true
    }
    this.setState({
      cards: [
        ...this.state.cards,
        character,
        clone
      ]
    });
  }

  removeCard(id) {
    let cards = this.state.cards.filter(card => card.id !== id) 
    this.setState({
      cards: cards
    });
  }

  startGame() {
    let cards = [...this.state.cards];
    let shuffleCards = this.shuffleCards(cards)
    this.setState({
      cards: shuffleCards,
      start_game: true,
      message: this.statusMessages.first_card
    });
  }

  render() {
    return (
      <div className="memory-game">
        <div className="status-bar">
          <p>{this.state.message}</p>
        </div>
        <div className={"start-game" + (this.state.cards.length > 5 && !this.state.start_game ? "" : " hide")}>
          <button onClick={() => this.startGame()}>Start Game</button>
        </div>
        <div className={"search" + (!this.state.start_game ? "" : " hide")}>
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
        </div>
        <ul className={"cards" + (this.state.start_game ? "" : " hide")}>
          {
            this.state.cards.map((card, index) =>
              <li key={index} className="card__item">
                <Card
                  id={card.id}
                  image={card.image}
                  isOn={card.isOn}
                  reveal={e => this.handleCardClick(index)}
                />
              </li>
            )
          } 
        </ul>
      </div>
    );
  }
}

export default App;
