import React from 'react'
import Equipment from './Equipment.js';
import CardGroup from 'react-bootstrap/CardGroup'
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalWeight: 0
    }
  }
  updateTotalWeight = (weight) => {
    this.setState({ totalWeight: this.state.totalWeight + weight });
  }

  render() {
    //set variables
    let equipArr = this.props.data.map((equip, idx) =>
      <Equipment
        key={idx}
        title={equip.title}
        image={equip.image}
        description={equip.description}
        weight={equip.weight}
        updateTotalWeight={this.updateTotalWeight}
        toggleModal={this.props.toggleModal}
      />
    )
    return (
      <>
        <h2>Total Weight: {this.state.totalWeight}  lbs</h2>
        <CardGroup>
          {equipArr}
        </CardGroup>
      </>
    )
  }

}

export default Main;