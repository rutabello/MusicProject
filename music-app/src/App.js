import React from 'react';
import Header from './components/Header';
import Map from './components/Map';
//import PopLink from './components/PopLink';

class App extends React.Component {

  state = {

    
      
      headerTitle: "Welcome to our fun Game!"
      
     
  }

  render() {
    return (
      <div>
      <Header title={this.state.headerTitle}/>
       <Map />
      </div>
    );
  }
}

export default App;
