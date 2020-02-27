import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import {Link} from 'react-router-dom';
import '../../App.css';
import Button from '../Buttons/Button';
import Shuffle from '../Utils/Shuffle';
import Spotify from '../Utils/Spotify';
import PlayerCountdown from '../PlayerCountdown/PlayerCountdown';
import Sound from 'react-sound';


      class Map extends React.Component {


          spotifyObject = {}
          display = ""
          chosenSong = ""
          coincidence = false
          answerCountShow= false
          unknownSongs= []

            state = {

              beforeGame: '',
              startGame: "Great, you chose ",
              title: "let it begin",
              game: "hideGame",
              gameStart: "showGame",
            
              songNames:[],
              currentSong: {
                  preview_url: "",
                  name: "",
                
              },

              clave: "37i9dQZF1DX7YCknf2jT6s",
              german: "6HiZDoQlmYliE3RhFm4Fek",
              spain: "7ki8VipxMygh7Y8ZdPRvmX",
              uk: "153yGNYdzvyCZxzDnIzNUx",
              italy: "44SmkW2zYTkTxVXBTZU7In",
              france: "23psvx6vUY6pmJHxE5yagM",
              sweden: "32g1QdVZbo696md2nCP6kF",
              romania: "37i9dQZEVXbNZbJ6TZelCq",
              russia: "1YWZENg7270nSPEm5i0mSk",
              moldavia: "4JuhvFePRTzgFA2J1zhRJg",
              turkey: "0rkeWiJ7L3BRuXDWqmgZSZ",
              australia: "72pX2gM4o2eOX68tmLcRPs",
              india: "37i9dQZEVXbLZ52XmnySJg",
              congo: "6OrCOUcHTeJeg0NQRlEVMK",
              world: "37i9dQZEVXbMDoHDwVN2tF",
              jazz: "37i9dQZF1DX7YCknf2jT6s",
             

              hideResults: true,
              correctAnswers: 0,
              total: 0,
              songUrl: "",
              playerState: Sound.status.PLAYING

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
                      total: this.state.total +1,
                      playerState: Sound.status.STOPPED
                  });
                }
            

                writeChosenSong = (songName) => {
                  this.chosenSong = songName;
              }
          
              checkCoincidence = () => {  //Checks if the user has chosen the right song or not
                  
                  this.coincidence = this.state.currentSong.name === this.chosenSong
          
                  if (this.coincidence !== true) { 
                      this.unknownSongs.push(this.state.currentSong.name)
                  }
          
                  console.log('paco' + this.unknownSongs)
              
                  this.setState({
                      hideResults: false,
                      correctAnswers: this.coincidence ? (this.state.correctAnswers +1) : this.state.correctAnswers
                  })
              }

              showAnswerCount = () => {
                this.answerCountShow= true
            }


            getSongUrl = (songName) => {
                
                var allTracksArr = this.spotifyObject.tracks.items.map((item) => { //allTracksArr is an array made of tracks (each one, in an object, and as much tracks as songs are in the playlist)
                    return item.track
                })

                var oneTrackArr = allTracksArr.filter((track) => {  //trackArr is an array with an only index which is an object with 2 properties: name and preview_url
                    return track.name === songName //Returns an array with the (only) object that fulfills this condition
                })

                var songUrl = oneTrackArr[0].preview_url

                this.setState({
                    songUrl: songUrl,
                    playerState: Sound.status.PLAYING
                })


                // return this.spotifyObject.tracks.items.filter(item => item.track.name === songName)[0].preview_url This does the same as getSongUrl but with much less lines
            }

     

            async componentDidMount() {
                
              this.spotifyObject = await Spotify.getPlaylist(this.state.clave);
          }

              
          componentDidUpdate  = async  (prevProps, prevState) => {

            if (prevState.clave !== this.state.clave){
              if (this.state.clave === this.state.italy){
                this.spotifyObject = await Spotify.getPlaylist(this.state.italy)
              } else if (this.state.clave === this.state.german){
                this.spotifyObject = await Spotify.getPlaylist(this.state.german)
              }   else if (this.state.clave === this.state.france){
                this.spotifyObject = await Spotify.getPlaylist(this.state.france)         
                  } else if (this.state.clave === this.state.spain){
                    this.spotifyObject = await Spotify.getPlaylist(this.state.spain)         
              }      else if (this.state.clave === this.state.uk){
                 this.spotifyObject = await Spotify.getPlaylist(this.state.uk)         
               }   else if (this.state.clave === this.state.sweden){
                this.spotifyObject = await Spotify.getPlaylist(this.state.sweden)         
              }  else if (this.state.clave === this.state.romania){
                this.spotifyObject = await Spotify.getPlaylist(this.state.romania)         
              }   else if (this.state.clave === this.state.russia){
                this.spotifyObject = await Spotify.getPlaylist(this.state.russia)         
              }   else if (this.state.clave === this.state.moldavia){
                this.spotifyObject = await Spotify.getPlaylist(this.state.moldavia)         
              }   else if (this.state.clave === this.state.turkey){
                this.spotifyObject = await Spotify.getPlaylist(this.state.turkey)         
              }   else if (this.state.clave === this.state.australia){
                this.spotifyObject = await Spotify.getPlaylist(this.state.australia)         
              }    else if (this.state.clave === this.state.india){
                this.spotifyObject = await Spotify.getPlaylist(this.state.india)         
              }    else if (this.state.clave === this.state.congo){
                this.spotifyObject = await Spotify.getPlaylist(this.state.congo)         
              }  
                 
          }
        }
            
            start = (event) =>  {
                
                let start = this.state.startGame + event.target.id;
                let newList = event.target.className;
                this.setState({
                    
                  beforeGame: start,
                  clave: newList

                })
              } 

              /* 
                const show = this.state.class2;
            this.setState ({class: show })
            this.setState({hide: "hide"})
              
              */


            show = () =>   {

                const discover = this.state.gameStart;

                this.setState({

                    game: discover
                })

            }

             render() {
                return (
                        
                       <div>

                     <LeafletMap
                        center={[50, 10]}
                        zoom={2.5}
                        maxZoom={10}
                        attributionControl={true}
                        zoomControl={true}
                        doubleClickZoom={true}
                        scrollWheelZoom={true}
                        dragging={true}
                        animate={true}
                        easeLinearity={0.35}
                      >
                      <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                      />
                      <Marker position={[50, 10]}>
                        <Popup>
                          <p id="Germany!" className="6HiZDoQlmYliE3RhFm4Fek" onClick={this.start} >Get to know Germanys top 50!</p> 
                        </Popup>
                      </Marker>

                      <Marker position={[42, 13]}>
                        <Popup>
                          <p id="Italy!" className="44SmkW2zYTkTxVXBTZU7In" onClick={this.start}>Get to know Italys top 50!</p> 
                        </Popup>
                      </Marker>

                      <Marker position={[46, 2 ]}>
                        <Popup>
                          <p id="France!" className="23psvx6vUY6pmJHxE5yagM" onClick={this.start}>Get to know Frances' top 50!</p> 
                        </Popup>
                      </Marker>

                      <Marker position={[40, -3 ]}>
                        <Popup>
                          <p id="Spain!" className="7ki8VipxMygh7Y8ZdPRvmX" onClick={this.start}>Get to know Spains top 50!</p> 
                        </Popup>
                      </Marker>

                      <Marker position={[53, -3 ]}>
                        <Popup>
                          <p id="UK!" className="153yGNYdzvyCZxzDnIzNUx" onClick={this.start}>Get to know Britan top 50!</p> 
                        </Popup>
                      </Marker>
                    
                    
                    <Marker position={[60, 17 ]}>
                        <Popup>
                          <p id="Sweden!" className="32g1QdVZbo696md2nCP6kF" onClick={this.start}>Get to know Swedens top 50!</p> 
                        </Popup>
                      </Marker>

                      <Marker position={[46, 25 ]}>
                        <Popup>
                          <p id="Romania!" className="37i9dQZEVXbNZbJ6TZelCq" onClick={this.start}>Get to know Romanias top 50!</p> 
                        </Popup>
                      </Marker>

                      <Marker position={[61.5, 105.3 ]}>
                        <Popup>
                          <p id="Russia!" className="1YWZENg7270nSPEm5i0mSk" onClick={this.start}>Get to know Russias top 50!</p> 
                        </Popup>
                      </Marker>

                      <Marker position={[47, 29]}>
                        <Popup>
                          <p id="Moldavia!" className="4JuhvFePRTzgFA2J1zhRJg" onClick={this.start}>Get to know Moldavias top 50!</p> 
                        </Popup>
                      </Marker>

                      <Marker position={[39, 35]}>
                        <Popup>
                          <p id="Turkey!" className="0rkeWiJ7L3BRuXDWqmgZSZ" onClick={this.start}>Get to know Turkeys top 50!</p> 
                        </Popup>
                      </Marker>

                      <Marker position={[-25, 134]}>
                        <Popup>
                          <p id="Australia!" className="72pX2gM4o2eOX68tmLcRPs" onClick={this.start}>Get to know Australias top 50!</p> 
                        </Popup>
                      </Marker>

                      <Marker position={[21, 79]}>
                        <Popup>
                          <p id="India!" className="37i9dQZEVXbLZ52XmnySJg" onClick={this.start}>Get to know Indias top 50!</p> 
                        </Popup>
                      </Marker>

                      <Marker position={[-1.5, 22]}>
                        <Popup>
                          <p id="Congo!" className="6OrCOUcHTeJeg0NQRlEVMK" onClick={this.start}>Get to know Congos top 50!</p> 
                        </Popup>
                      </Marker>
                    </LeafletMap>






             <div className={this.state.game}>
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
                  </div>
                  <div class={this.unknownSongs.length > 0 ? "show" : "hide"}>
                      <h4>Learn from your mistakes</h4>
                      <ul>
                          {this.unknownSongs.map((song) => {
                              return (
                                  <div>
                                      <li>{song} <button onClick={() => this.getSongUrl(song)}>Listen again</button></li>
                                      {/* We write it with an arrow function instead of a 'normal' function so we can avoid an infinite loop when setting the state */}
                                  </div>
                              )
                          })}
                      </ul>
                      <Sound 
                          url={this.state.songUrl}
                          playStatus={this.state.playerState}
                          autoLoad
                      />
                    
                  </div>
                  <h3><Link to="/">Out the door</Link></h3>
                  {  /*  <h3 className="hideGame"><Link to="quiz">Quiz</Link></h3> */}
                      <h3><Link to="map">Discover more places</Link></h3>
                      
                  </div>
              </div>
                    
               
          <h2>{this.state.beforeGame}</h2>
          <h3><Link to="/">Let me leave!</Link></h3>                
          <h3 onClick={this.show}><Link to="map">Start</Link></h3>
          </div>
            
    );
  }
}

export default Map;


/* className="hideGame"

let countries = [
  {
    latitude: 10,
    longitude: 30,
    countryName: "Germany",
    text: "Get to know Germanys top 50"
  }
]

countries.map(country =>
  <Marker position={[{country.latitude}, 13]}>
  <Popup>
    <p id="Italy" onClick={this.start}>Get to know Germanys top 50!</p> 
  </Popup>
</Marker>
  ) */