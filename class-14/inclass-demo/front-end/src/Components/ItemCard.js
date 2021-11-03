import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
class ItemCard extends React.Component {

  runHandleDelete = () => {
    this.props.handleDelete(this.props.item._id);
  }
  runShowUpdateForm = () => {
    this.props.showUpdateForm(this.props.item);
  }


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
          <Button variant="danger" onClick={() => { this.props.handleDelete(this.props.item._id) }}>Delete</Button>
          <Button onClick={() => { this.props.showUpdateForm(this.props.item) }}>Update</Button>
        </Card.Body>
      </Card>
    )
  }
}
export default ItemCard;