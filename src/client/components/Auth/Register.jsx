import React, { Component } from 'react';
import { withRouter } from 'react-router';
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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }

  handleChange(e) {
    const stateObj = {};
    const stateKey = e.target.name;
    stateObj[stateKey] = e.target.value;
    this.setState(stateObj);
  }

  handleRegisterSubmit() {
    const { username, password } = this.state;
    firebase.auth()
      .createUserWithEmailAndPassword(username, password)
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        this.props.router.push('/dashboard')
      })
  }

  render() {
    return (
      <div>
        <div id="register-form">
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
            onClick={this.handleRegisterSubmit}
          >Register</button>
        </div>
      </div>
    );
  }
}

Register.propTypes = propTypes;

export default withRouter(Register);
