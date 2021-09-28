import React from 'react'
import HornedBeast from './HornedBeast.js'

class Main extends React.Component {
  render() {
    return (
      <>
        {this.props.allBeasts.map((beast, idx) => {
          return <HornedBeast
            key={idx}
            beast={beast}
            displayAsModal={this.props.displayAsModal}
          />
        })}
      </>
    )
  }
}

export default Main