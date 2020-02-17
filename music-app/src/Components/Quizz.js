import React, {Component} from 'react';
import Sound from 'react-sound';
import Button from './Buttons/Button';
import './Buttons/Button.css';
import MyCountdown from './Countdown/MyCountdown';
import Shuffle from '../Utils/shuffleFunction';
import Spotify from '../Utils/Spotify';

class Quizz extends Component {

    spotifyObject = {}

    state = {
        songNames:[],
        currentSong: {
            preview_url: "",
            name: ""
        },
        playStatus: Sound.status.STOPPED
    }

    /**
     * This fn returns an array with 4 song names randomly including the current song 
     * @param {string} currentSong - name of the current song playing
     * @returns {array} songsToDisplay
     */
    getSongsToDisplay = (currentSongName) => {

        var allSongsArr = this.spotifyObject.tracks.items.map(function (item){
            return item.track.name
        });
        
        var filteredSongsArr = allSongsArr.filter(function (song) {
            return song !== currentSongName
        });
    
        var shuffledFilterSongsArr = Shuffle(filteredSongsArr);
    
        var fourNonShuffledSongsArr = shuffledFilterSongsArr.slice(0, 3); // actually 3
        fourNonShuffledSongsArr.push(currentSongName); // now 4
        
        var fourShuffledSongsArr = Shuffle(fourNonShuffledSongsArr)
        
        console.log(fourShuffledSongsArr)

        return fourShuffledSongsArr;
    }

    startGame = () => {

        this.setState({
            songNames: this.getSongsToDisplay(this.state.currentSong.name)
        })

        this.setState({
            playStatus: Sound.status.PLAYING
        })
    }

    async componentDidMount() {
        
        this.spotifyObject = await Spotify.getPlaylist();

        console.log(this.spotifyObject)

        var currentSong = this.spotifyObject.tracks.items[Math.floor(Math.random()*this.spotifyObject.tracks.items.length)].track;

        this.setState({
            currentSong: {
                preview_url: currentSong.preview_url,
                name: currentSong.name
            }
        });
    }



    render () {
        return (
            <div className="QuestionAndAnswers">
                <div className="Player">
                    <Sound 
                        url={this.state.currentSong.preview_url}
                        playStatus={this.state.playStatus}
                        autoLoad
                        // onLoading={this.handleSongLoading}
                        // onPlaying={this.handleSongPlaying}
                        // onFinishedPlaying={this.handleSongFinishedPlaying}
                    />
                </div>
                <button onClick={this.startGame}>Play</button>
                <div className="Countdown">
                        <MyCountdown />
                </div>
                <div className="FourButtons">
                    {this.state.songNames.map(function(songName){
                            return (<Button key={songName} className="button" answer={songName}/>)
                        })
                        }
                </div>
            </div>
        )
    };
}


export default Quizz;