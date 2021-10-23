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

class App extends React.Component {
  render() {

    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {/* Main in the root */}
              <Main />
            </Route>

            <Route exact path="/aboutus">
              {/* About us in the aboutus route */}
              <AboutUs />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
