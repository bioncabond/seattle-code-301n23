import React from 'react';
import rawData from './data.json'
import Main from './Main.js'
import SelectedBeast from './SelectedBeast.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedBeast: {},
      allBeasts: rawData
    }
  }

  displayAsModal = (name) => {
    console.log('displayAsModal:', name);
    const selectedBeast = rawData.find(beast => beast.title === name);
    this.setState({ selectedBeast, showModal: true });
  }
  handleClose = () => this.setState({ showModal: false });

  render() {
    console.log('App State:', this.state);
    return (
      <>
        <Main
          allBeasts={this.state.allBeasts}
          displayAsModal={this.displayAsModal}
        />
        <SelectedBeast
          selectedBeast={this.state.selectedBeast} handleClose={this.handleClose}
          showModal={this.state.showModal}
        />
      </>
    );
  }
}

export default App;
