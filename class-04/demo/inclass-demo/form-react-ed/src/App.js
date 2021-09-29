import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'user'
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
  }

  handleType = (event) => {
    this.setState({ userName: event.target.value })
  }

  handleChange = (event) => {
    console.log('year selected:', event.target.value);
  }

  render() {


    return (
      <>
        <h2 id="nameHeader">Welcome, {this.state.userName}!</h2>
        <main>
          <Form id="myForm" onSubmit={this.onSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" onInput={this.handleType} name="name" id="name" />
            <br />
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" name="dob" id="dob" />
            <br />
            <Form.Group controlId="yearFrom.ControlSelect">
              <Form.Control as="select" name="year" onChange={this.handleChange}>
                <option value="">Select A Year</option>
                <option value="20XX">20XX</option>
                <option value="1989">1989</option>
                <option value="1776">1776</option>
                <option value="2077">2077</option>
              </Form.Control>
            </Form.Group>
            <br />
            <Button type="submit">Submit</Button>
          </Form>
        </main>
      </>
    );
  }
}

export default App;
