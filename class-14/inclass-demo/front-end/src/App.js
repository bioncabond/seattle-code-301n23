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

import { withAuth0 } from '@auth0/auth0-react'; //AUTH0

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateForm: false,
      user: null
    }

  }

  setCreateForm = () => this.setState({ showCreateForm: true });
  hideCreateForm = () => this.setState({ showCreateForm: false });

  render() {
    console.log('APPPROPS:', this.props);
    return (
      <>
        <Router>
          <Header
            user={this.state.user}
            setCreateForm={this.setCreateForm}
          />
          <Switch>
            <Route exact path="/">
              {/* Main in the root */}
              {this.props.auth0.isAuthenticated ? <Main
                showCreateForm={this.state.showCreateForm}
                hideCreateForm={this.hideCreateForm}
              /> : ''
              }


            </Route>

            <Route exact path="/aboutus">
              <AboutUs />
            </Route>
          </Switch>

          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App); //AUTH0
