import React, { Component } from 'react';
import request from 'superagent';

class Button extends Component {
  constructor() {
    super();
    this.state = {
      total_clicks: null,
    };
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    request.get('/api/v1/users')
          // .send(this.state)
          .then((response) => {
            console.log(response);
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
