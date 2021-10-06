import React from 'react';

import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      locationObj: {}
    }
    //functions :)
  }
  getLocation = async () => {
    console.log(`button pushed`);
    console.log(process.env.REACT_APP_LOCATION_API_KEY)
    let URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.cityName}&format=json`;
    console.log(URL);

    //TRY Axios GET request
    try {
      let locData = await axios.get(URL);
      //Response obj.data
      console.log(locData.data[0])
      //Set it to setate
      this.setState({
        locationObj:
          locData.data[0]
      });
      console.log(this.state.locationObj);
    }
    //If there is an error in the try
    catch (error) {
      console.log('there was an error:', error);
    }

  }
  render() {
    return (
      <>
        <h1>Enter A City</h1>
        <h3>{this.state.cityName}</h3>
        <input onChange={(e) => this.setState({ cityName: e.target.value })}>
        </input>
        <button onClick={this.getLocation}>Search!</button>
        {this.state.locationObj.display_name && <div>
          <h2>City Found: {this.state.locationObj.display_name}</h2>
          <h4>Lat: {this.state.locationObj.lat}</h4>
          <h4>Lat: {this.state.locationObj.lon}</h4>
        </div>}
      </>
    );
  }
}



export default App;
