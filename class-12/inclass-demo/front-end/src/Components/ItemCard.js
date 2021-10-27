import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
class ItemCard extends React.Component {

  render() {
    runHandleDelete = () => {
      this.props.handleDelete(this.props.item._id);
    }
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{this.props.item.name}</Card.Title>
          <ListGroup>
            <ListGroup.Item>Description: {this.props.item.description}</ListGroup.Item>
            <ListGroup.Item>Quantity: {this.props.item.qty}</ListGroup.Item>
            <ListGroup.Item>Status: {this.props.item.status}</ListGroup.Item>
          </ListGroup>
          <Button onClick={this.runHandleDelete}>Delete</Button>
        </Card.Body>
      </Card>
    )
  }
}
export default ItemCard;