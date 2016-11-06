import React, { Component } from 'react';
import { Link } from 'react-router';
import firebase from '../../../firebase.config.js';
import WelcomeSlideshow from './WelcomeSlideshow.jsx';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false, // this will be either true or false
    };
    this.signOutUser = this.signOutUser.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log('Logged IN', firebaseUser.uid);
        this.setState({ isLoggedIn: true });
      } else {
        console.log('Not logged in');
        this.setState({ isLoggedIn: false });
      }
    });
  }

  signOutUser() {
    firebase.auth()
    .signOut()
    .then(() => {
      // console.log('user logged out');
      this.setState({ isLoggedIn: false });
    });
  }

  render() {
    console.log('state of Home', this.state);
    return (
      <div>
        <h1>Largess</h1>
        {/* <WelcomeSlideshow /> */}
        {
          !this.state.isLoggedIn ?
            <div>
              <br />
              <br />
              <Link className="button register" to="register">Sign Up</Link>
              <br />
              or <Link to="login">Already have an account? Login here</Link>
            </div>
          :
            <div>
              <Link className="button logout" to="/" onClick={this.signOutUser}>Log Out</Link>
              <br />
              <Link to="/home">Home</Link>
            </div>
        }
      </div>
    );
  }
}

export default Welcome;
