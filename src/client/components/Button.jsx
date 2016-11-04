import React, { Component } from 'react';
import Counter from './Counter.jsx';
import request from 'superagent';
import firebase from '../../../firebase.config.js';

const propTypes = {
  userId: React.PropTypes.number,
  clicks: React.PropTypes.number,
};

class Button extends Component {
  constructor() {
    super();
    this.state = {
      clicks: null,
    };
    this.buttonClickPostToDB = this.buttonClickPostToDB.bind(this);
  }

  componentDidMount() {
    const userClicks = firebase.auth().currentUser.uid;
    request.get(`http://localhost:3000/api/v1/users/${userClicks}`)
           .then((response) => {
             console.log(response.body);
             this.setState({ clicks: response.body.clicks.length });
            console.log(this.state);
           });
  }

  buttonClickPostToDB() {
    request.post('http://localhost:3000/api/v1/clicks/')
      .send(
          { click:
          { user_id: 16,
            location: 'NYC' }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        this.setState({ clicks: this.state.clicks += 1 });
        console.log(this.state);
      });
  }

  render() {
    return (
      <div>
        <div id="button_container">
          <button className="btn" onClick={this.buttonClickPostToDB}>Feeling Guilty?</button>
          <Counter clicks={this.state.clicks} />
        </div>
      </div>
    );
  }
}

Button.propTypes = propTypes;

export default Button;

/*

Error: Objects are not valid as a React child (found: object with keys {req, xhr, text, statusText, statusCode, status, statusType, info, ok, clientError, serverError, error, accepted, noContent, badRequest, unauthorized, notAcceptable, notFound, forbidden, headers, header, type, charset, body}). If you meant to render a collection of children, use an array instead or wrap the object using createFragment(object) from the React add-ons. Check the render method of `Button`.(

*/
