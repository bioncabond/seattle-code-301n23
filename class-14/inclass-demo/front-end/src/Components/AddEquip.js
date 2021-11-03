import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AddEquip extends React.Component {


  handleSubmit = (e) => {
    e.preventDefault();

    let newObj = {
      name: e.target.name.value,
      description: e.target.description.value,
      qty: e.target.qty.value,
      status: e.target.selectOption.value
    }
    this.props.handlePost(newObj);
    this.props.hideCreateForm();
  }
  render() {
    return (
      <>
        <h1>Add a new piece of equipment</h1>
        <Form className="m-2" style={{ width: '20rem' }} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" id="name" placeholder="name"></Form.Control>

            <Form.Label>Description</Form.Label>
            <Form.Control type="text"
              id="description"
              placeholder="description"></Form.Control>

            <Form.Label>Quantity</Form.Label>
            <Form.Control type="text" id="qty" placeholder="Qty"></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Choose a Status</Form.Label>
            <Form.Control as="select" id="selectOption">
              <option>Working</option>
              <option>Replacement</option>
              <option>Repair</option>
            </Form.Control>
          </Form.Group>

          <Button className="m-2" type="submit">Create Equipment</Button>
        </Form>
      </>
    )
  }
}
export default AddEquip;