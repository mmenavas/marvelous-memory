import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      cards: []
    }
  }
  
  componentDidMount() {

    let cards = this.createCards(3);
    console.log(cards);
    let shuffleCards = this.shuffleCards(cards);
    console.log(shuffleCards);

    this.setState({
      cards: shuffleCards
    })
  }

  /**
   * Create an array of sorted cards
   * 
   * @return array of card values
   */
  createCards(uniqueCards) {
    let cards = [];
    let count = 0; 

    while (count < uniqueCards) {
      count++;
      cards.push(count);
    }

    cards = cards.concat(cards)

    return cards;
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

  render() {
    return (
      <div className="memory-game">
        <ul>
          {
            this.state.cards.map((value, index) =>
              <li key={index} className="card">{value}</li>
            )
          } 
        </ul>
      </div>
    );
  }
}

export default App;
