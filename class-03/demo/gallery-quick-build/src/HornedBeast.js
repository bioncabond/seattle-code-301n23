import React from 'react';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

class HornedBeast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: 0
    }
  }

  addFav = () => this.setState({ fav: this.state.fav + 1 });

  render() {
    return (
      <>
        <h2>{this.props.beast.title}</h2>
        <p>{this.props.beast.description}</p>
        <p onClick={() => this.props.displayAsModal(this.props.beast.title)}>{this.props.beast.image_url}</p>
        <p onClick={this.addFav}> ❤️ {this.state.fav} </p>
      </>
    );
  }
}

export default HornedBeast