import React from 'react'
import Equipment from './Equipment.js';
import data from './data.json'
class Main extends React.Component {

  //set functions 

  render() {
    //set variables
    let equipArr = [];

    data.forEach((equip, idx) => {
      equipArr.push(
        <Equipment key={idx} title={equip.title} image={equip.image} description={equip.description} />
      )
    })
    return (
      <>
        <h2>Main</h2>
        {equipArr}
      </>
    )
  }

}

export default Main;