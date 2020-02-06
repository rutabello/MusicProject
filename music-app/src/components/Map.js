import React from 'react';
import './Map.css';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
//import PopLink from './components/PopLink';

class Map extends React.Component {

  state = {
   
      linkUrl: "https://de.wikipedia.org/wiki/Spotify"
         
  }

  render() {
    return (
      
        <div className="map">
      <LeafletMap
        center={[50, 10]}
        zoom={3}
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
        <Marker position={[40, 10]}>
        
          <Popup>
          <a href={this.state.linkUrl}>Come on and play!</a>
          </Popup>
        </Marker>
        <Marker position={[30, 4]}>
        
          <Popup>
          <a href={this.state.linkUrl}>Come on and play!</a>
          </Popup>
        </Marker>
        <Marker position={[20, 20]}>
        
          <Popup>
          <a href={this.state.linkUrl}>Come on and play!</a>
          </Popup>
        </Marker>
        <Marker position={[50, 10]}>
        <Popup >  
        <a href={this.state.linkUrl}>Come on and play!</a>      
          </Popup>
        </Marker>
      </LeafletMap>
      </div>
    );
  }
}

export default Map;