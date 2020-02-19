import React from 'react';
import './Button.css';

const Button = (props) => {

    console.log(props)

    return (
        <button 
            onClick={props.onClick} 
            className={"myButton button " + (props.isCorrect ? "green" : "red")}>
                {props.printedSong}
        </button>
    )
};


export default Button;