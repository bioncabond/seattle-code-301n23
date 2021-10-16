import React from 'react'
import axios from 'axios';
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poke: {}
    }
  }

  handleClick = () => {
    console.log('1')
    axios.get('http://localhost:3001/pokemon?poke=snorlax')
      .then(info => {
        console.log('2');
        this.setState({ poke: info.data });
      })
      .catch(error => {
        console.log(error.message);
      });
    console.log('3');
  }
  render() {
    return (
      <>
        <h1>Main</h1>
        <button onClick={this.handleClick}>Get Poke</button>
        <div>{this.state.poke.name &&
          this.state.poke.name}</div>
      </>
    )
  }
}

export default Main;