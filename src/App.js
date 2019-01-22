import React, { Component } from 'react';
import Card from './components/Card';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      cards: []
    }
  }
  
  componentDidMount() {

    let cards = this.createCards(8);
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

    while (count < uniqueCards * 2) {
      count++;
      cards.push({
        value: count,
        isOn: false
      });
    }

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

  handleCardClick(index) {
    console.log(index);
    let cards = [...this.state.cards];
    cards[index].isOn = true;
    
    this.setState({
      cards: cards
    })

  }

  render() {
    return (
      <div className="memory-game">
        <ul className="items">
          {
            this.state.cards.map((card, index) =>
              <li key={index} className="item">
                <Card
                  value={card.value}
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
