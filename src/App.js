import React, { Component } from 'react';
import Card from './components/Card';
import './App.css';

class App extends Component {
  statusMessages = {
    next_card: "Nice! Now pick another card.",
    not_a_match: "Tough luck! Try again.",
    match: "Very well! Find the next pair.",
    win: "Excellent! You found all of the matching cards."
  }

  constructor() {
    super();
    this.state = {
      cards: [],
      card1: -1,
      matches: 0,
      message: "Start game by selecting a card."
    }
  }
  
  componentDidMount() {
    let cards = this.createCards(8);
    let shuffleCards = this.shuffleCards(cards);

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
      cards.push({
        value: count,
        isOn: false
      });
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
    if (cards[card1].value !== cards[index].value) {
      setTimeout(() => {
        cards[card1].isOn = false;
        cards[index].isOn = false;
        
        this.setState({
          card1: -1,
          cards: cards
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

  render() {
    return (
      <div className="memory-game">
        <div className="status-bar">
          <p>{this.state.message}</p>
        </div>
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
