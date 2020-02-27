//!!! IMPORTANT: No push to github as long as the clientId is visible in the files!
const clientId = process.env.REACT_APP_API_KEY; 
const redirectUri = 'http://localhost:3000/'; // Have to add this to an accepted Spotify redirect URIs on the Spotify API.
let accessToken;

//Classica alemana 4BfSTZ6p3bQCZNmV7eovMD
//Top50 Spain 4kCRwBU4lLcXZZrapYOEcL
 
const Spotify = {
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
       getPlaylist()   {
       
            const accessToken = Spotify.getaccessToken();                   
            const headers = { Authorization: `Bearer ${accessToken}` };          
            return fetch('https://api.spotify.com/v1/playlists/4kCRwBU4lLcXZZrapYOEcL', {headers: headers
          }).then(response => {
            return response.json();
          });
      },
      
}
 
  
// This way you can access the returned object. "collaborative" is just the first property that appears,
// probably nothing we will actually use, just as an example of how to access it.
// const play = Spotify.getPlaylist().then((value) => {console.log(value.collaborative)});

// console.log(play)

export default Spotify;