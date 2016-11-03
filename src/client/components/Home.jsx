import React, { Component } from 'react';
import { Link } from 'react-router';
import request from 'superagent';
import firebase from '../../../firebase.config.js';

import Button from './Button.jsx';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      firebase_uid: '',
    };
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    request.get(`http://localhost:3000/api/v1/users/${firebase.auth().currentUser.uid}`).then((response) => {
      console.log(response.body);
      const firstName = response.body.first_name;
    });
  }

  render() {
    return (
      <div>
      <h1>Welcome, Nate</h1>
        <Button />
        <Link to="charity">Charities</Link>
      </div>
  );
  }
}

export default Home;
