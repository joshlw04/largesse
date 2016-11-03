import React, { Component } from 'react';
import { withRouter } from 'react-router';
import firebase from '../../../../firebase.config.js';

// const propTypes = {
  // router: React.PropTypes.obj,
// };

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleChange(e) {
    const stateObj = {};
    const stateKey = e.target.name;
    stateObj[stateKey] = e.target.value;
    this.setState(stateObj);
  }

  handleLoginSubmit() {
    const { username, password } = this.state;
    firebase.auth()
    .signInWithEmailAndPassword(username, password)
    .catch((err) => {
      console.log(err);
    })
    .then((response) => {
      console.log(response);
      this.props.router.push('/home');
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
            onClick={this.handleLoginSubmit}
          >Login</button>
        </div>
      </div>
    );
  }
}

// Login.propTypes = propTypes;

export default withRouter(Login);
