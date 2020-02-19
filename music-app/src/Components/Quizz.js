import React, {Component} from 'react';
import Button from './Buttons/Button';
// import './Buttons/Button.css';
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
        
    }

    chosenSong= ""
    coincidence= false

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

    writeChosenSong = (songName) => {
        this.chosenSong = songName;
        console.log("PACO", this.chosenSong)
    }

    checkCoincidence = () => {  //Tells the button if the user has chosen the right song or not
        
        if (this.state.currentSong.name === this.chosenSong) {
            this.coincidence=true;
        }
        this.coincidence=false
    }

    checkCoincidenceTwo = (songName) => {  //Tells the button if it itself has de correct answer
                
        if (songName === this.state.currentSong.name) {
            return true;
        }

        return false;
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
                        coincidence={this.checkCoincidence}
                    />
                </div>

                <div className="FourButtons">
                    {this.state.songNames.map((songName) => {
                        return (
                            <Button 
                                key={songName} 
                                printedSong={songName} 
                                onClick={() => this.writeChosenSong(songName)}//We write it like this so the function writeChoosenSong isn't executed when the button is rendered but when the button is clicked. Different than what we're doing some lines above in the onMusicPlays, setNewRandomSong or songURL
                                isCorrect={this.checkCoincidenceTwo(songName)}
                            />
                        )
                    })
                    }
                </div>
            </div>
        )
    };
}


export default Quizz;

