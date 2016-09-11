import React from 'react'; 
import './Cards.css';

const Cards = React.createClass({
   displayName: 'Cards', 
    
PropType: {
    id: React.PropTypes.number,
    image: React.PropTypes.object, 
    isFlipped: React.PropTypes.bool, 
    flipCard: React.PropTypes.func, 
    userInteractionDisabled: React.PropTypes.bool,
    isHidden: React.PropTypes.bool,
},      
    
    render() {
        
        let onclick = this.props.userInteractionDisabled || this.props.isHidden 
                      ? function() {}
                      : this.props.flipCard.bind(null, this.props.id)
        
        let className = "Cards"
        
        className = this.props.isHidden 
                    ? className + " hidden"
                    : className
        
        className = this.props.isFlipped
                    ? className + " flipped"
                    : className
        
        let image = (
            <img className="Cards-image" src={this.props.image.src} role="presentation"/>
        )  
        
        let back = (
            <div className="Cards-back"></div>
        ) 
            
        return (
          <div onClick={onclick} className={className}>
            {back}
            {image}
          </div>
        );
    }
})

export default Cards;
