import React from 'react';
import ItemCard from './ItemCard.js'
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: ''
    }
  }
  render() {
    console.log('render', 'data:', this.state);
    return (
      <>
        {this.props.showItem ? this.props.itemData.map((item, idx) => <ItemCard
          handleDelete={this.props.handleDelete}
          key={idx} item={item}
          updateForm={this.props.updateForm}
        />)
          : <Alert variant="danger" style={{ width: '20rem' }}> No Equipment to show</Alert>}
      </>
    );
  }
}
export default Main;