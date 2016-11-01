import React, { Component } from 'react';
import request from 'superagent';

class Button extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUser: null,
    };
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    request.post('http://localhost:3000/api/v1/clicks')
           .send({ click: { user_id: 3, location: 11226 } })
           .then((response) => {
             console.log(response.body);
           });
  }

  render() {
    return (
      <div id="button_container">
        <button className="btn" onClick={this.buttonClick}>Feeling Guilty?</button>
      </div>
    );
  }
}

export default Button;
