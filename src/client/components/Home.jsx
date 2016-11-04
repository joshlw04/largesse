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
      user_id: null,
    };
    this.getUser = this.getUser.bind(this);
  }

  componentWillMount() {
    this.setState({ firebase_uid: (firebase.auth().currentUser.uid) });
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const baseURL = 'http://localhost:3000/api/v1/users/';
    request.get(`${baseURL}${this.state.firebase_uid}`).then((response) => {
      const { first_name } = response.body;
      this.setState({
        first_name: first_name,
        firebase_uid: firebase.auth().currentUser.uid,
        user_id: response.body.id,
        // clicks: response.body.clicks.length,
      });
      console.log('Home was rendered!');
    });
  }

  render() {
    return (
      <div>
        <h1>Welcome, {this.state.first_name}</h1>
        <Button
          userId={this.state.user_id}
        />
        <Link to="charity">Charities</Link>
      </div>
    );
  }
}

export default Home;
