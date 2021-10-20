import React from 'react'
import Card from 'react-bootstrap/Card';
class ItemCard extends React.Component {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.recipe.image_url} />
        <Card.Body>
          <Card.Title>{this.props.recipe.title}</Card.Title>
          <Card.Text>
            {this.props.recipe.ingredients &&
              this.props.recipe.ingredients.map((ing, idx) => <p key={idx}>{ing.text}</p>)
            }
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}
export default ItemCard;