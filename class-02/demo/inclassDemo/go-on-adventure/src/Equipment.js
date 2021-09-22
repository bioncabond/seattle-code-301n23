import React from 'react'
import './Equipment.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


class Equipment extends React.Component {
  //Have to add for state:
  constructor(props) {
    super(props);
    //State must be an object {}
    this.state = {
      numberInv: 0,
      isFav: false
    }
  }
  onAdd = () => {
    //how you set state
    this.setState({ numberInv: this.state.numberInv + 1 });
  }
  onRemove = () => {
    if (this.state.numberInv > 0) {
      this.setState({ numberInv: this.state.numberInv - 1 });
    }
  }
  setFav = () => {
    if (this.state.isFav) {
      this.setState({ isFav: false })
    }
    else {
      this.setState({ isFav: true })
    }
  }




  render() {
    return (





      <div className="m-2">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.props.image} />
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Text>
              {this.props.description}
            </Card.Text>
            <p onClick={this.setFav}>Amount in Inventory: {this.state.numberInv}</p>
            {/* Ternary statement is a if/else rolled into one.  evaluation ? true : false  */}
            <p>{(this.state.isFav) ? '❤️' : ''}</p>

            <Button className="m-1" onClick={this.onAdd}>Add</Button>
            <Button variant="danger" className="m-1" onClick={this.onRemove}>Remove</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }

}

export default Equipment;