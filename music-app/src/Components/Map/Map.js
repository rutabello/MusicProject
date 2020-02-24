import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import {Link} from 'react-router-dom';
import '../../App.css';



class Map extends React.Component {

    state = {

      beforeGame: '',
      startGame: "Great, you chose ",
      title: "let it begin",
     

    }
    
     start = (event) =>  {
         
        let start = this.state.startGame + event.target.id
        this.setState({
            
          beforeGame: start

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
                <p id="Germany!" onClick={this.start}>Get to know Germanys top 50!</p> 
              </Popup>
            </Marker>

            <Marker position={[42, 13]}>
              <Popup>
                <p id="Italy!" onClick={this.start}>Get to know Italys top 50!</p> 
              </Popup>
            </Marker>

            <Marker position={[46, 2 ]}>
              <Popup>
                <p id="France!" onClick={this.start}>Get to know Frances' top 50!</p> 
              </Popup>
            </Marker>

            <Marker position={[40, -3 ]}>
              <Popup>
                <p id="Spain!" onClick={this.start}>Get to know Spains top 50!</p> 
              </Popup>
            </Marker>

            <Marker position={[53, -3 ]}>
              <Popup>
                <p id="Great Britan!" onClick={this.start}>Get to know Britan top 50!</p> 
              </Popup>
            </Marker>
          
          
          <Marker position={[60, 17 ]}>
              <Popup>
                <p id="Sweden!" onClick={this.start}>Get to know Swedens top 50!</p> 
              </Popup>
            </Marker>

            <Marker position={[46, 25 ]}>
              <Popup>
                <p id="Romania!" onClick={this.start}>Get to know Romanias top 50!</p> 
              </Popup>
            </Marker>

            <Marker position={[61.5, 105.3 ]}>
              <Popup>
                <p id="Russia!" onClick={this.start}>Get to know Russias top 50!</p> 
              </Popup>
            </Marker>

            <Marker position={[47, 29]}>
              <Popup>
                <p id="Moldavia!" onClick={this.start}>Get to know Moldavias top 50!</p> 
              </Popup>
            </Marker>
          </LeafletMap>

               
          <h2>{this.state.beforeGame}</h2>

          <h3><Link to="/">Let me leave!</Link></h3>
          <h3><Link to="quiz">Quiz</Link></h3>
          <h3 className="hideGame"><Link to="map">Map</Link></h3>
          </div>
            
    );
  }
}

export default Map;


/* let countries = [
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