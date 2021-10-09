import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
class CharacterList extends React.Component {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://via.placeholder.com/200x200" />
        <Card.Body>
          <Card.Title>{this.props.character.name}</Card.Title>
          <Card.Text>
            {this.props.character.game}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default CharacterList;