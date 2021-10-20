import React from 'react';
import ItemCard from './ItemCard.js'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeData: '',
      showRecipe: false
    }
  }
  handleClick = async () => {
    this.setState({ showRecipe: false });
    let URL = 'http://localhost:3001/recipies?q=shrimp';
    try {
      let inData = await axios.get(URL);
      this.setState({
        recipeData: inData.data,
        showRecipe: true
      });

    }
    catch (err) {

    }

  };

  render() {
    console.log(this.state)
    return (
      <>
        <Button onClick={this.handleClick}>Press to Get Recipies</Button>
        {this.state.showRecipe &&
          this.state.recipeData.map((item, idx) => {

            return <ItemCard key={idx} recipe={item} />
          })}
      </>
    );
  }
}
export default Main;