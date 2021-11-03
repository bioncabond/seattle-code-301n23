import React from 'react';
import ItemCard from './ItemCard.js'
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import UpdateEquip from './UpdateEquip.js';
import AddEquipment from './AddEquip.js';
import { withAuth0 } from '@auth0/auth0-react'; //AUTH0
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: [],
      showItem: false,
      showUpdateForm: false
    }
  }
  async componentDidMount() {
    console.log('didmount');
    //JWT
    let getIdToken = await this.props.auth0.getIdTokenClaims();
    let jwt = getIdToken.__raw

    console.log(jwt);
    let config = {
      headers: { "Authorization": `Bearer ${jwt}` }
    }

    axios.get(`${process.env.REACT_APP_SERVER}/equip`, config)
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
    console.log(postObj);
    let URL = `${process.env.REACT_APP_SERVER}/equip`
    let postRes = await axios.post(URL, postObj)
    //console.log the response back to make that is worked
    console.log('postRes', postRes.data);
    //upstate state.
    this.setState({ itemData: [...this.state.itemData, postRes.data] })
  }

  handleDelete = async (itemId) => {
    console.log(itemId)
    let URL = `${process.env.REACT_APP_SERVER}/equip/${itemId}`;
    console.log(URL);
    let delObj = await axios.delete(URL);
    let delObjData = delObj.data;
    let copyState = this.state.itemData;
    let filteredData = copyState.filter((item) => item._id !== delObjData._id);
    console.log(filteredData);
    this.setState({ itemData: filteredData });
  }

  showUpdateForm = (itemObj) => {
    this.setState({
      showUpdateForm: true,
      updateObject: itemObj
    });
    console.log('showUpdateForm:', itemObj);
  }

  handleUpdate = async (itemObj) => {
    const putObj = { name: itemObj.name, description: itemObj.description, qty: itemObj.qty, status: itemObj.status }
    let URL = `${process.env.REACT_APP_SERVER}/equip/${itemObj._id}`;
    let putReq = (await axios.put(URL, putObj)).data;

    let copyState = this.state.itemData.map((item, idx) => {
      if (item._id === putReq._id) return putReq
      else {
        return item
      }
    });
    this.setState({ itemData: copyState, showUpdateForm: false })
  }
  render() {
    return (
      <>
        <h1>{this.props.auth0.user.name}</h1>
        {this.state.showItem ? this.state.itemData.map((item, idx) => <ItemCard
          showUpdateForm={this.showUpdateForm}
          handleDelete={this.handleDelete}
          key={idx}
          item={item} />) : <Alert variant="danger" style={{ width: '20rem' }}> No Equipment to show</Alert>}
        {this.state.showUpdateForm ? <UpdateEquip handleUpdate={this.handleUpdate} equip={this.state.updateObject} /> : ''}
        {this.props.showCreateForm ? <AddEquipment hideCreateForm={this.props.hideCreateForm} handlePost={this.handlePost} /> : ''}
      </>
    );
  }
}
export default withAuth0(Main);