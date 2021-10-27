import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
class Header extends React.Component {
  render() {
    return (
      <nav>
        <h1>GhostSmashers Equipment Manager</h1>
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/aboutus">About</NavLink>
        <NavLink to="/create">Add Equipment</NavLink>
      </nav>
    );
  }
}
export default Header;