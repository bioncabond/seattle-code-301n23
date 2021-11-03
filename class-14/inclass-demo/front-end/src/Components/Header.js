import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import './Header.css';
import { withAuth0 } from '@auth0/auth0-react'; //AUTH0
class Header extends React.Component {
  render() {
    return (
      <nav>
        <h1>GhostSmashers Equipment Manager</h1>
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/aboutus">About</NavLink>
        {this.props.auth0.isAuthenticated &&
          <Button onClick={this.props.setCreateForm}>Add Equipment</Button>}
        {this.props.auth0.isAuthenticated ?
          <Button onClick={() => this.props.auth0.logout({ returnTo: window.location.origin })}>Logout</Button> :
          <Button onClick={() => this.props.auth0.loginWithRedirect()}>Login</Button>}
      </nav>
    );
  }
}
export default withAuth0(Header);