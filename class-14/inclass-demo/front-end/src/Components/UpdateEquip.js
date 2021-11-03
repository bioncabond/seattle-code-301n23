import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class UpdateEquip extends React.Component {


  handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit');
    console.log(e.target.name.value);
    console.log(e.target.description.value);
    console.log(e.target.qty.value);
    console.log(e.target.selectOption.value);
    //create the object that is going to be posted
    let newObj = {
      _id: this.props.equip._id,
      name: (e.target.name.value) ? e.target.name.value : this.props.equip.name,
      description: (e.target.description.value) ? e.target.description.value : this.props.equip.description,
      qty: (e.target.qty.value) ? e.target.qty.value : this.props.equip.qty,
      status: (e.target.selectOption.value) ? e.target.selectOption.value : this.props.equip.status
    }
    this.props.handleUpdate(newObj);
  }


  render() {
    console.log('updateEquipProps:', this.props);
    return (
      <>
        <h1>Update Equipment</h1>
        <Form className="m-2" style={{ width: '20rem' }} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" id="name" placeholder={this.props.equip.name}></Form.Control>

            <Form.Label>Description</Form.Label>
            <Form.Control type="text"
              id="description"
              placeholder={this.props.equip.description}></Form.Control>

            <Form.Label>Quantity</Form.Label>
            <Form.Control type="text" id="qty" placeholder={this.props.equip.qty}></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Choose a Status</Form.Label>
            <Form.Control as="select" id="selectOption">
              <option></option>
              <option>Working</option>
              <option>Replacement</option>
              <option>Repair</option>
            </Form.Control>
          </Form.Group>

          <Button className="m-2" type="submit">Update Equipment</Button>
        </Form>
      </>
    )
  }
}
export default UpdateEquip;