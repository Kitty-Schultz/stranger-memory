import React from 'react'; 
import './Button.css';

const Button = React.createClass({
   displayName: 'Button', 
    
propTypes: {
  handleStartNewGame: React.PropTypes.func,  
},    
    
    render() {
        return (
            <button className="Button" onClick={this.props.handleStartNewGame}>
                <h2>Play!</h2> 
            </button>
        );
    }
})
export default Button;
