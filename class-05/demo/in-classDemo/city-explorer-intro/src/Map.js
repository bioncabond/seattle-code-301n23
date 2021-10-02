import React from 'react';
class Map extends React.Component {
  render() {
    console.log('map props:', this.props)
    return (
      <>
        <h3>Map of {this.props.search_query}</h3>
        <img src={this.props.mapImage} />
      </>
    )
  }
}
export default Map;