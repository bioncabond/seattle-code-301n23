import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
class CharacterList extends React.Component {
  render() {
    return (
      <Card className="m-3" style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.item.image_url} />
        <Card.Body>
          <Card.Title>{this.props.item.artist}</Card.Title>
          <Card.Text>
            {this.props.item.description}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default CharacterList;