import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../../App.css'

const Home = props => (

  
  
      <div>
      <h1>{props.homeContent.title}</h1>
      <h2>{props.homeContent.subtitle}</h2>
      <div Style={'display:flex; justify-content: space-around;'}>
          <h3 className="hideGame"><Link to="/">Home</Link></h3>
         { /*<h3><Link to="quiz">Quiz</Link></h3>*/}
          <h3><Link to="map">Start Game</Link></h3>
       
      </div>
  </div>
 
 )

export default Home;