import React from 'react';
import './Button.css';

const Button = (props) => {
    return (
        <button className="myButton">{props.answer}</button>
    )
};


export default Button;