import React, { Component } from 'react';
import { withRouter } from 'react-router';
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
        this.props.router.push('/home');
      });
  }

  handleChange(e) {
    const stateObj = {};
    const stateKey = e.target.name;
    stateObj[stateKey] = e.target.value;
    this.setState(stateObj);
    console.log('set state in login');
  }

// Adds current user to database
  createUsers() {
    const username = this.state.username;
    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    const firebase_uid = this.state.firebase_uid;
    request.post('http://localhost:3000/api/v1/users')
           .send(
      { user:
      { first_name: first_name,
        last_name: last_name,
        email: username,
        total_clicks: 0,
        cost_per_click: 1,
        payment_type: 'VISA',
        payment_last_four: 7889,
        firebase_uid: firebase_uid,
        charity_id: 1 } })
          .then((response) => {
            console.log(response.body);
          });
  }

  render() {
    return (
      <div>
        <div id="register-form">
          <div>
          <input
             name="first_name"
             onChange={this.handleChange}
             type="text"
             placeholder="First Name"
           />
          <input
            name="last_name"
            onChange={this.handleChange}
            type="text"
            placeholder="Last Name"
          />

            <input
              name="username"
              onChange={this.handleChange}
              type="text"
              placeholder="username"
            />
          </div>
          <div>
            <input
              name="password"
              onChange={this.handleChange}
              type="password"
              placeholder="password"
            />
          </div>
          <button
            onClick={this.handleRegisterSubmit}
          >Register</button>
        </div>
      </div>
    );
  }
}

Register.propTypes = propTypes;

export default withRouter(Register);