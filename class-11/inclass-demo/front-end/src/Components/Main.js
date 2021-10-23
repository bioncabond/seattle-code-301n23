import React from 'react';
import ItemCard from './ItemCard.js'
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: [],
      showItem: false,
      queryString: ''
    }
  }
  //Will run right after component is rendered
  componentDidMount() {
    console.log('didmount');
    axios.get(process.env.REACT_APP_SERVER)
      .then(infoObj => infoObj.data)
      .then(data => this.setState({
        itemData: data,
        showItem: true
      }))
      .catch(err => console.log('error:', err.message));
  }

  render() {
    console.log('render');
    return (
      <>
        {this.state.showItem ? this.state.itemData.map((item, idx) => <ItemCard key={idx} item={item} />) : <Alert variant="danger" style={{ width: '20rem' }}> No Equipment to show</Alert>}
      </>
    );
  }
}
export default Main;