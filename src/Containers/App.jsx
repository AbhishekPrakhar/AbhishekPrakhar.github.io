import React, { Component } from 'react';
//import { Router, Route, Redirect,browserHistory } from 'react-router';
import { connect } from 'react-redux';
import CIPLandingPage from '../../src/Components/CIP/LandingPage/CIPLandingPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../Styles/Roboto.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab,faStroopwafel)

class App extends Component {

  render() {

    return (
      <div>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <div>
              <Route path='/cip' component={CIPLandingPage} />
            </div>
          </Switch>
        </Router>

      </div>
    );
  }
}

export default connect(null, null)(App);