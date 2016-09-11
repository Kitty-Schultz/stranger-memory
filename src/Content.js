import React from 'react'; 
import _ from 'lodash';
import './Content.css';
import Cards from './Cards.js';

const Content = React.createClass({
   displayName: 'Content', 
       
PropType: {
    cards: React.PropTypes.object,
    numberOfCards: React.PropTypes.number,
    flipCard: React.PropTypes.func,
    userInteractionDisabled: React.PropTypes.bool,
    isGameCompleted: React.PropTypes.bool,
},      
    
renderCards() {

    const cardComponents = _.map(this.props.cards, (card) => {
        return (<Cards                    
            id={[card.id]} 
            image={card.image}
            isFlipped={card.isFlipped}
            flipCard={this.props.flipCard}    
            userInteractionDisabled={this.props.userInteractionDisabled}
            isHidden={card.isHidden}    
        />)
    })
    return cardComponents                        
},    
                                                          
    render() {
        
        let congratulations = null;
        if (this.props.isGameCompleted) {
            congratulations = 
                <div className="congratulations">
                    <h1>Well done from the upside down!</h1>
                </div>
            }
        let container = null; 
        if (!this.props.isGameCompleted) {
            container = 
                <div className="cards-container">
                    {this.renderCards()}
                </div>
        }    
        
        return (
        <div className="Content">
            { congratulations }
            { container }
        </div>
        );
    }
})

export default Content;


