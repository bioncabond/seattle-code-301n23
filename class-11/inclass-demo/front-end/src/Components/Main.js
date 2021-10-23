import React from 'react';
import ItemCard from './ItemCard.js'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: [],
      showItem: false,
      queryString: ''
    }
  }
  handleClick = async () => {
    console.log('handleClick');
  };


  render() {
    console.log(this.state)
    return (
      <>

        <Button onClick={this.handleClick}>Show Inventory</Button>
        {this.state.showItem ? this.state.itemData.map((item, idx) => <ItemCard key={idx} item={item} />) : <Alert variant="danger" style={{ width: '20rem' }}> No Equipment to show</Alert>}
      </>
    );
  }
}
export default Main;