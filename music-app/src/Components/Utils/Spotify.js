//!!! IMPORTANT: No push to github as long as the clientId is visible in the files!
const clientId = '70bc8f049a454f5e95545f6852c1cf76'; 
const redirectUri = 'http://localhost:3000/'; // Have to add this to an accepted Spotify redirect URIs on the Spotify API.
let accessToken;
// for connection with the map: connect playlist id to the markers and save it in a const to insert it later in the 
// getplaylist() method.

//let germany = idsfasdf3498; let spain; let france; let USA; let Russia; let Italy

const Spotify = {

  name: "Lena",

  getaccessToken (){
      if (accessToken){
          return accessToken ;
      }
  
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
      if (accessTokenMatch && expiresInMatch) {
          accessToken = accessTokenMatch[1];
          const expiresIn = Number(expiresInMatch[1]);
          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing me to grab a new access token when it expires.
          return accessToken ;
        } else {
          const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
          window.location = accessUrl;
        }
      },

       getPlaylist(country)   {
              let ID = country;
            const accessToken = Spotify.getaccessToken();                   
            const headers = { Authorization: `Bearer ${accessToken}` };          
            return fetch(`https://api.spotify.com/v1/playlists/${ID}`, {headers: headers
          }).then(response => {
            return response.json();
          });
      },

      changeID ()  {

        let country = "6HiZDoQlmYliE3RhFm4Fek"
        this.setState({
       
        playlistID: country,
      })
      //console.log("here" + this.state.playlistID)
    }

       
  }
 

  
  // This way you can access the returned object. "collaborative" is just the first property that appears,
  // probably nothing we will actually use, just as an example of how to access it.
 // const play = Spotify.getPlaylist().then((value) => {console.log(value.collaborative)});
 
  //console.log(play) 

 


export default Spotify;