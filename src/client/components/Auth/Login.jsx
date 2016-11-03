import React, { Component } from 'react';
import { withRouter } from 'react-router';
import firebase from '../../../../firebase.config.js';

const propTypes = {
  router: React.PropTypes.object,
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const stateObj = {};
    const stateKey = e.target.name;
    stateObj[stateKey] = e.target.value;
    this.setState(stateObj);
    console.log('set state in login');
  }

  handleSubmit() {
    const { username, password } = this.state;
    firebase.auth()
    .signInWithEmailAndPassword(username, password)
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      console.log('push to button');
      this.props.router.push('/button');
    });
  }

  render() {
    return (
      <div>
        <div id="login-form">
          <div>
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
            onClick={this.handleSubmit}
          >Login</button>
        </div>
      </div>
    );
  }
}

Login.propTypes = propTypes;

export default withRouter(Login);
