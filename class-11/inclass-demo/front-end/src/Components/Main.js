import React from 'react';
import ItemCard from './ItemCard.js'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
    let sampleArr = [{ title: 'Card Title', arr: ['1', '2', '3'], image_url: 'https://via.placeholder.com/200' },
    { title: 'Card Title 2', arr: ['4', '5', '6'], image_url: 'https://via.placeholder.com/200' },
    { title: 'Card Title 3', arr: ['7', '8', '9'], image_url: 'https://via.placeholder.com/200' }
    ]
    this.setState({
      itemData: sampleArr,
      showItem: true
    })
  };
  handleChange = (event) => {
    this.setState({ queryString: event.target.value });
  }

  render() {
    console.log(this.state)
    return (
      <>
        <h2>{this.state.queryString}</h2>
        <Form>
          <Form.Label>Search for something</Form.Label>
          <Form.Control onChange={this.handleChange} type="text" placeholder="Place Something" />
        </Form>
        <Button onClick={this.handleClick}>Press to Get Recipies</Button>
        {this.state.showItem &&
          this.state.itemData.map((item, idx) => {
            return <ItemCard key={idx} item={item} />
          })}
      </>
    );
  }
}
export default Main;