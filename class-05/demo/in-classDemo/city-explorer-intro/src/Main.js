import React from 'react';
import Map from './Map.js'
import Restaurants from './Restaraunts.js';
import location from './data/location.json';
import restaurants from './data/restaurants.json';
import mapImage from './images/map.png';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationObj: location,
      restaurantsObj: restaurants,
      displayResults: false
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.cityInput.value);
    this.setState({ displayResults: true })
  }

  // use the && conditional -> (if state is true && display component)
  render() {
    console.log('Main state: ', this.state);
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>Enter City Name: </label>
          <input type="text" name="cityInput"
            id="cityForm"
            placeholder="Place City Here..."
          />
          <button type="submit">Search!</button>
        </form>
        {this.state.displayResults &&
          <Map mapImage={mapImage} search_query={this.state.locationObj.search_query} />
        }
        {this.state.displayResults &&
          <Restaurants
            restaurants={this.state.restaurantsObj}
            search_query={this.state.locationObj.search_query}
          />
        }

      </>
    )
  }
}
export default Main;