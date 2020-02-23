import React from 'react'
import './Button.css'
import BgMusic from '@react-element/bg-music'

function Button() {
  let audio = new Audio("https://freesound.org/data/previews/506/506053_10991815-lq.mp3")

  const start = () => {
    audio.play()
  }

  return (
    <div id="btn-div">
        <a href="" id="btn-game" target="_b" onClick={start}>Start game</a>
        <BgMusic.Default/>
    </div>
  );

}

export default Button


