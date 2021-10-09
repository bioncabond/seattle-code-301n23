import React from 'react';
import CharacterList from './Components/CharaterList.js';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      showCharacters: false
    }
  }

  handleClick = async () => {
    try {
      console.log('Click');
      lat = 1234
      let allGamesArr = await axios.get(`http://localhost:3001/allGames?lat=${lat}&lon=5678&city=new`);

      console.log(allGamesArr.data);
      this.setState({
        characters: allGamesArr.data,
        showCharacters: true
      });

    }
    catch (error) {
      console.log('Error is GET request:', error.message);
    }


  }
  render() {
    console.log(this.state)
    return (
      <>
        <h1>App.js</h1>
        {
          this.state.showCharacters &&
          this.state.characters.map((character, idx) => <CharacterList character={character} key={idx} />)


        }
        <Button onClick={this.handleClick}>Get All Characters</Button>
      </>
    );
  }
}

export default App;
