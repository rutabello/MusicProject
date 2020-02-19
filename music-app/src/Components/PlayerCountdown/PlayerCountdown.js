import React, {Component} from 'react';
import Sound from 'react-sound';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const SONG_TIMER_DURATION = 10;

class PlayerCountdown extends Component {

  // Properties
  state = {
    playStatus: Sound.status.STOPPED,
    isPlaying: false,
    playClicked: false,
    uniqueKey: Date.now()
  }

  exampleRef = React.createRef(); // Create the ref
  

  // Methods
  playMusicStartTimer = () => {

    this.setState({
      uniqueKey: Date.now(),
      playStatus: Sound.status.PLAYING,
      isPlaying: true,
      playClicked: true
    })

    setTimeout(() => {
    
      this.stopMusic()
      this.props.setNewRandomSong();

    }, SONG_TIMER_DURATION * 1000);
    
    this.props.onMusicPlays();
  }

  renderTime = value => {
    if (value === 0) {
      return <button onClick={this.playMusicStartTimer}>Next Song</button>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{value}</div>
        <div className="text">seconds</div>
      </div>
    );
  }

  stopMusic = () => {

    this.setState({
      playStatus: Sound.status.STOPPED
    })
  }


  // Render
  render () {
    return (
      <div>

        {
          this.state.playClicked
            ? null
            : <button onClick={this.playMusicStartTimer}>Play</button>
        }

        <Sound 
          url={this.props.songURL}
          playStatus={this.state.playStatus}
          autoLoad
        />

        <CountdownCircleTimer
          key={this.state.uniqueKey}
          isPlaying={this.state.isPlaying}
          durationSeconds={SONG_TIMER_DURATION}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          renderTime={this.renderTime}
        />

      </div>
    )
  }
};

export default PlayerCountdown;

// Circle Countdown Info https://www.npmjs.com/package/react-countdown-circle-timer

// Number Countdown Info https://www.npmjs.com/package/react-countdown-now

// React Sound Info https://www.npmjs.com/package/react-sound