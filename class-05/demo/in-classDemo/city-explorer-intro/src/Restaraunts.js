import React from 'react';
class Restaurants extends React.Component {
  render() {
    console.log('restaraunts props:', this.props);
    //map it here and return a variable for display in render
    return (
      <>
        <h1>Restaraunts in {this.props.search_query}</h1>
        <ul>
          {this.props.restaurants.map((rest, idx) => (
            <li key={idx}>
              <p>Name: {rest.restaurant}</p>
              <p>Cuisine: {rest.cuisines}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }
}
export default Restaurants;