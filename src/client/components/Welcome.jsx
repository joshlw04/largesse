import React, { Component } from 'react';
import { Link } from 'react-router';

import Tips from './Tips.jsx';
import Button from './Button.jsx';
// import Register from './Auth/Register.jsx';
// import Login from './Auth/Login.jsx';

import firebase from '../../../firebase.config.js';

const propTypes = {
  router: React.PropTypes.object,
};

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      isLoggedIn: (firebase.auth().currentUser !== null),
    };
    this.signOutUser = this.signOutUser.bind(this);
  }

// Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op.
  componentWillMount() {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.setState({ loggedIn: (firebaseUser !== null) });
      // console.log(firebaseUser);
      if (firebaseUser) {
        console.log('Logged IN', firebaseUser.uid);
      } else {
        console.log('Not logged in');
      }
    });
  }

  signOutUser() {
    firebase.auth()
    .signOut()
    .then(() => {
      console.log('user logged out');
      this.setState({ isLoggedIn: false });
    });
  }

  render() {
    console.log(this.state.isLoggedIn);

    return (
      <div>Largess
        <Tips />
        {
          this.state.isLoggedIn === false ?
            <div>
              <Link to="/login" className="welcome_button" role="button">Login</Link>
              <Link to="/register" role="button">Register</Link>
            </div>
          :
            <div>
              <Link to="/" onClick={this.signOutUser} role="button">Log Out</Link>
            </div>
        }
      </div>
    );
  }
}

Welcome.propTypes = propTypes;

export default Welcome;
