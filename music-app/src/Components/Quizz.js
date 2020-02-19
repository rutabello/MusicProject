import React, {Component} from 'react';
import Button from './Buttons/Button';
import './Buttons/Button.css';
import Shuffle from './Utils/Shuffle';
import Spotify from './Utils/Spotify';
import PlayerCountdown from './PlayerCountdown/PlayerCountdown';

class Quizz extends Component {

    spotifyObject = {}
    display = ""

    state = {
        songNames:[],
        currentSong: {
            preview_url: "",
            name: ""
        },
        chosenSong: ""
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

    chooseSongs = () => {

        this.setState({
            songNames: this.getSongsToDisplay(this.state.currentSong.name)
        })
    }

    setNewRandomSong = () => {

        var currentSong = this.spotifyObject.tracks.items[Math.floor(Math.random()*this.spotifyObject.tracks.items.length)].track;

        this.setState({
            currentSong: {
                preview_url: currentSong.preview_url,
                name: currentSong.name
            }
        });
    }

    async componentDidMount() {
        
        this.spotifyObject = await Spotify.getPlaylist();

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

                <div className="Countdown">
                    <PlayerCountdown
                        onMusicPlays={this.chooseSongs}
                        setNewRandomSong={this.setNewRandomSong}
                        songURL={this.state.currentSong.preview_url} 
                    />
                </div>

                <div className="FourButtons">
                    {this.state.songNames.map(function(songName) {
                        return (
                            <Button key={songName} className="button" printedSong={songName} />
                        )
                    })
                    }
                </div>
            </div>
        )
    };
}


export default Quizz;