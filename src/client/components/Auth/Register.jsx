import React, { Component } from 'react';
import { withRouter, Link } from 'react-router';
import request from 'superagent';
import firebase from '../../../../firebase.config.js';

const propTypes = {
  router: React.PropTypes.object,
};

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      firebase_uid: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.createUsers = this.createUsers.bind(this);
  }

// Firebase Auth and setting state with the firebase UID, then push to Home
  handleRegisterSubmit() {
    const { username, password } = this.state;
    firebase.auth()
      .createUserWithEmailAndPassword(username, password)
      .catch((err) => {
        console.log(err);
      })
      .then((firebaseUserData) => {
        this.setState({ firebase_uid: firebaseUserData.uid });
        this.createUsers();
      });
  }

  handleChange(e) {
    const stateObj = {};
    const stateKey = e.target.name;
    stateObj[stateKey] = e.target.value;
    this.setState(stateObj);
  }

// Adds current user to database
  createUsers() {
    const { username, first_name, last_name, firebase_uid } = this.state;
    request.post('https://largress-api.herokuapp.com/api/v1/users')
           .send(
      { user:
      { first_name: first_name,
        last_name: last_name,
        email: username,
        total_clicks: 0,
        cost_per_click: 1,
        payment_type: '',
        payment_last_four: null,
        firebase_uid: firebase_uid,
        charity_id: 1 } })
          .catch((err) => {
            console.log(err);
          })
          .then(() => {
            this.props.router.push('/home');
          });
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <Link
            className="back-button"
            to="/"><i className="ion-ios-arrow-back">
            </i> Back</Link>
        </div>
        <h2>Create Account</h2>
        <div id="register-form">
          <div>
            <input
              name="first_name"
              onChange={this.handleChange}
              type="text"
              placeholder="First Name"
            />
            <br />
            <input
              name="last_name"
              onChange={this.handleChange}
              type="text"
              placeholder="Last Name"
            />
            <br />
            <input
              name="username"
              onChange={this.handleChange}
              type="text"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              name="password"
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            className="button register"
            onClick={this.handleRegisterSubmit}
            onTouchStart={this.handleRegisterSubmit}
          >Register</button>
        </div>
      </div>
    );
  }
}

Register.propTypes = propTypes;

export default withRouter(Register);
