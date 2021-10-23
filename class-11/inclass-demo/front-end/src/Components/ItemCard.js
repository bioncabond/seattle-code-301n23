import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
class ItemCard extends React.Component {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{this.props.item.name}</Card.Title>
          <ListGroup>
            <ListGroup.Item>Description: {this.props.item.description}</ListGroup.Item>
            <ListGroup.Item>Quantity: {this.props.item.qty}</ListGroup.Item>
            <ListGroup.Item>Status: {this.props.item.status}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    )
  }
}
export default ItemCard;