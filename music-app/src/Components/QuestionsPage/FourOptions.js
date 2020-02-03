import React from 'react';
import './FourOptions.css';

const FourOptionsButton = (props) => {
    return (
        <button className="myButton">{props.question}</button>
    )
};


export default FourOptionsButton;