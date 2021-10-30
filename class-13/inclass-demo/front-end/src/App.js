import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
import AboutUs from './Components/AboutUs.js';
import AddEquipment from './Components/AddEquip.js';
import axios from 'axios';
import UpdateEquipForm from './Components/UpdateEquipForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: [],
      showItem: false,
      showUpdateForm: false, //new
      updateObject: {} //new
    }
  }

  //Will run right after component is rendered
  componentDidMount() {
    console.log('didmount');
    axios.get(`${process.env.REACT_APP_SERVER}/equip`)
      .then(infoObj => infoObj.data)
      .then(data => {
        if (data.length > 0) this.setState({
          itemData: data,
          showItem: true
        })
        console.log('data:', data);
      })
      .catch(err => console.log('error:', err.message));
  }
  handlePost = async (postObj) => {
    //console.log to see that I am getting the data
    console.log(postObj);
    // create and object to post to the server
    //Did that in AddEquipment
    let URL = `${process.env.REACT_APP_SERVER}/equip`
    let postRes = await axios.post(URL, postObj)
    //console.log the response back to make that is worked
    console.log('postRes', postRes.data);
    //upstate state.
    this.setState({ itemData: [...this.state.itemData, postRes.data] })
  }

  handleDelete = async (itemId) => {
    //take the idNum make it an param in the URL
    let URL = `${process.env.REACT_APP_SERVER}/equip/${itemId}`;
    //make axios call to delete
    //recieve the deleted obj back
    let delObj = await axios.delete(URL);
    console.log(delObj.data);
    let delObjData = delObj.data;

    //update status
    //make a copy of state
    let copyState = this.state.itemData;
    //filter to find the id
    let filteredData = copyState.filter((item) => item._id !== delObjData._id);
    console.log(filteredData);
    //set the copy back to state
    this.setState({ itemData: filteredData });





  }

  //UpdateForm function
  // pass in a parameter is the object selected.
  updateForm = (itemObj) => {
    // set the object to state
    //set the boolean showUpdateForm = true
    this.setState({ updateObject: itemObj, showUpdateForm: true });
  }
  // Pass that down to the itemCard via props
  handleUpdate = async (itemObj) => {
    let URL = `${process.env.REACT_APP_SERVER}/equip/${itemObj._id}`
    console.log('URL:', URL);
    //axios put 
    //Don't send _id or __v properties to the server
    let putObj = {
      name: itemObj.name,
      description: itemObj.description,
      qty: itemObj.qty,
      status: itemObj.status
    }

    let putReq = await axios.put(URL, putObj);
    let putData = putReq.data;
    console.log('putData:', putData);

    //Update the state
    let copyState = this.state.itemData.map((equip, idx) => {
      if (equip._id === putData._id) return putData;
      else { return equip }
    })
    this.setState({ itemData: copyState, showUpdateForm: false })
  }

  //UpdateForm will have a button to update
  //Build the PUT function
  // pass the PUT function to the updateForm
  // 

  render() {
    console.log('APPSTATE:', this.state)
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {/* Main in the root */}
              <Main
                itemData={this.state.itemData} showItem={this.state.showItem}
                handleDelete={this.handleDelete}
                updateForm={this.updateForm}
              />
            </Route>

            <Route exact path="/aboutus">
              {/* About us in the aboutus route */}
              <AboutUs />
            </Route>
            <Route exact path="/create">
              {/* About us in the aboutus route */}
              <AddEquipment handlePost={this.handlePost} />
            </Route>
          </Switch>
          {this.state.showUpdateForm ? <UpdateEquipForm
            item={this.state.updateObject}
            handleUpdate={this.handleUpdate}
          /> : ''}
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
