import React from 'react'; 
import _ from 'lodash';
import './App.css';
import Header from './Header.js';
import Content from './Content.js';
import Footer from './Footer.js';

import stranger_1 from '../images/stranger_1.png';
import stranger_2 from '../images/stranger_2.png';
import stranger_3 from '../images/stranger_3.png';
import stranger_4 from '../images/stranger_4.png';
import stranger_5 from '../images/stranger_5.png';
import stranger_6 from '../images/stranger_6.png';

const App = React.createClass({
   displayName: 'App', 
    
getInitialState() {
  return {
      numberOfCards: 0,
      cards: {},
      images: [],
      flipped: [],
      userInteractionDisabled: false,
      isGameCompleted: false, 
  }  
}, 
    
handleStartNewGame() {
      const numberOfCards = 12   
      let images = [
          {id: 1, src: stranger_1},
          {id: 2, src: stranger_2},
          {id: 3, src: stranger_3},
          {id: 4, src: stranger_4},
          {id: 5, src: stranger_5},
          {id: 6, src: stranger_6},
      ]
      
images = _.shuffle(_.concat([], images, images))

     let cards = {}
        for(let i = 0; i < numberOfCards; i++) {
            cards[i] = {
            id: i, 
            image: images[i],
            isFlipped: false,
            isHidden: false,
            }
    }
        this.setState ({ 
            numberOfCards: numberOfCards,
            cards: cards, 
            images: images,
            isGameCompleted: false,
    })        
},                 
    
 
flipCard(cardID) { 
    let cards = Object.assign({}, this.state.cards)
    cards[cardID].isFlipped = true; 
    
    let flipped = Object.assign([], this.state.flipped)

    if (!_.isEqual(flipped[0], cards[cardID])) {
        flipped.push(cards[cardID])
    }
    
    this.setState({
        cards: cards,
        flipped: flipped,
        userInteractionDisabled: (flipped.length === 2),
    }, () => {
            if (flipped.length === 2) {
                this.compareCards(flipped, cards)
        }
    })
},     
    
compareCards(flipped, cards) {
    const cardOne = flipped[0]
    const cardTwo = flipped[1]
    if (cardOne.image.id === cardTwo.image.id) {
        cards[cardOne.id].isHidden = true
        cards[cardTwo.id].isHidden = true
    } else {
        cards[cardOne.id].isFlipped = false
        cards[cardTwo.id].isFlipped = false
    }
    
    let hiddenCards = _.filter(cards, function(card) {
        return card.isHidden;
    });
    
    let isGameCompleted = hiddenCards.length === this.state.numberOfCards;
    
    setTimeout(() => {
        this.setState({
            cards: cards, 
            userInteractionDisabled: false,
            flipped: [],
            isGameCompleted: isGameCompleted,
        })
      }, 1000)    
},    
        
    render() {
        console.log(this.state);
        return (
          <div className="App">         
          <Header />  
          <Content 
            cards={this.state.cards} 
            numberOfCards={this.state.numberOfCards} 
            flipCard={this.flipCard}              
            userInteractionDisabled={this.state.userInteractionDisabled}
            isGameCompleted={this.state.isGameCompleted}
          /> 
          <Footer 
            handleStartNewGame={this.handleStartNewGame} 
          />     
          </div>
        );
    }
})

export default App;
