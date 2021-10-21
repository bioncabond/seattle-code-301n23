import React from 'react'
import Card from 'react-bootstrap/Card';
class ItemCard extends React.Component {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.item.image_url} />
        <Card.Body>
          <Card.Title>{this.props.item.title}</Card.Title>
          <Card.Text>
            <ul>
              {this.props.item.arr &&
                this.props.item.arr.map((ing, idx) => <li key={idx}>{ing.text}</li>)
              }
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}
export default ItemCard;