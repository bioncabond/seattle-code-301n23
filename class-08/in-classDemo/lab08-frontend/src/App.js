import React from 'react';
import PictureCard from './Components/PictureCard.js';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoFormReq: '',
      photos: [],
      showPhotos: false
    }
  }
  //onClick for the photos
  //onChange so I can store the typed data.
  onChangePhotoForm = (e) => {
    this.setState({ photoFormReq: e.target.value });
  }
  handlePhotoClick = async () => {
    try {
      console.log('Click');
      let recvievedPhotos = await axios.get(`http://localhost:3001/photos?query=${this.state.photoFormReq}`);

      console.log(recvievedPhotos.data);
      this.setState({ photos: recvievedPhotos.data, showPhotos: true });
    }
    catch (e) {
      console.log('Error: ', e.message);
    }

  }

  render() {
    console.log(this.state)
    return (
      <>
        <Form>
          <Form.Label>Enter a Keyword</Form.Label>
          <Form.Control onChange={this.onChangePhotoForm} type="text" placeholder="Enter a term..." />
          <Button onClick={this.handlePhotoClick}>Search!</Button>
        </Form>
        {this.state.showPhotos && this.state.photos.map((photo, idx) =>
          <PictureCard key={idx} item={photo} />)
        }
      </>
    );
  }
}
export default App;
