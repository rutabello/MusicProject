import React from 'react';
import './Button.css';

const Button = (props) => {
    return (
        <button className="myButton">{props.printedSong}</button>
    )
};


export default Button;