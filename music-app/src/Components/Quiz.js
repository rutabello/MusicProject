import React, {Component} from 'react';
import Button from './Buttons/Button';
import './Quiz.css'
import Shuffle from './Utils/Shuffle';
import Spotify from './Utils/Spotify';
import PlayerCountdown from './PlayerCountdown/PlayerCountdown';

class Quiz extends Component {

    spotifyObject = {}
    display = ""
    chosenSong = ""
    coincidence = false
    answerCountShow= false

    state = {
        songNames:[],
        currentSong: {
            preview_url: "",
            name: ""
        },
        hideResults: true,
        correctAnswers: 0,
        total: 0,
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
        

        return fourShuffledSongsArr;
    }

    chooseSongs = () => {

        this.setState({
            songNames: this.getSongsToDisplay(this.state.currentSong.name)
        })
    }

    setNewRandomSong = () => {
        
        var randomSong = this.spotifyObject.tracks.items[Math.floor(Math.random()*this.spotifyObject.tracks.items.length)].track;

        this.setState({
            currentSong: {
                preview_url: randomSong.preview_url,
                name: randomSong.name
            },
            songNames: this.getSongsToDisplay(randomSong.name),
            hideResults: true, //I don't think thingthis line is needed since it's not changing any
            total: this.state.total +1
        });
    }

    writeChosenSong = (songName) => {
        this.chosenSong = songName;
    }

    checkCoincidence = () => {  //Checks if the user has chosen the right song or not
        
        this.coincidence = this.state.currentSong.name === this.chosenSong
    
        this.setState({
            hideResults: false,
            correctAnswers: this.coincidence ? (this.state.correctAnswers +1) : this.state.correctAnswers
        })
    }

    showAnswerCount = () => {
        this.answerCountShow= true
    }


    async componentDidMount() {
        
        this.spotifyObject = await Spotify.getPlaylist();
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
                        showAnswerCount={this.showAnswerCount}
                    />
                </div>

                <div className={"FourButtons " + (this.state.hideResults ? 'forceGrayColor' : "")} >
                    {this.state.songNames.map((songName) => {
                        return (
                            <Button 
                                key={songName} 
                                printedSong={songName} 
                                onClick={() => this.writeChosenSong(songName)}//We write it like this so the function writeChoosenSong isn't executed when the button is rendered but when the button is clicked. Different than what we're doing some lines above in the onMusicPlays, setNewRandomSong or songURL
                                currentSong={this.state.currentSong.name}
                            />
                        )
                    })
                    }
                </div>
                <div>
                    <p class={this.answerCountShow ? "show" : "hide"}>Right answers: {this.state.correctAnswers}  out of {this.state.total}</p>
                    {/* <p>Right answers:<br /> {this.state.correctAnswers}  out of {this.state.total}</p> */}

                </div>
            </div>
        )
    };
}


export default Quiz;

