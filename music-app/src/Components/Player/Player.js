
import React, { Component } from 'react'
import Play from './Play/Play'
import Pause from './Pause/Pause'

class Player extends Component {

constructor(props) {
  super(props)
  this.state = {
    playing: false
  }
}

handlePlayerClick = () => {
  if (!this.state.playing) {
    this.setState({playing: true})
  } else {
    this.setState({playing: false})
  }
}

  render() {
    return (
      <div className="player" >
        {this.state.playing? <Pause onPlayerClick={this.handlePlayerClick} /> : <Play onPlayerClick={this.handlePlayerClick} />}
      </div>
    )
  }
}

export default Player