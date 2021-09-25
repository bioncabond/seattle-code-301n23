import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import dataJson from './data.json'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      data: dataJson
    }
  }

  //function for if you want to show = showModal = true
  //function for if you want to hide = showModal = false

  //Toggle when used, would change for true -> false false->true
  toggleModal = () => {
    console.log('clicked');
    (this.state.showModal) ? this.setState({ showModal: false }) : this.setState({ showModal: true });
  }

  render() {
    return (
      <>
        <Container>
          <Header />
          <Main
            toggleModal={this.toggleModal}
            data={this.state.data} />
          <Footer />
        </Container>
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header>
            <Modal.Title>Why go on an Adventure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Because!  Save Middle-Earth, Find the lost stones of Shankara, or Do something new!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default App;
