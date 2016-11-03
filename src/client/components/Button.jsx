import React, { Component } from 'react';
import request from 'superagent';

class Button extends Component {
  constructor() {
    super();
    this.state = {
      clicks: null,
    };
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    request.post('http://localhost:3000/api/v1/clicks')
           .send({ click: { user_id: 3, location: 11226 } })
           .then((response) => {
             console.log(response.body);
           });
    this.setState({ clicks: this.clicks + 1 });
    console.log(this.state.clicks);
  }

  render() {
    return (
      <div>
        <div id="button_container">
          <button className="btn" onClick={this.buttonClick}>Feeling Guilty?</button>
        </div>
        {/* <div>
          <Counter />
        </div> */}
      </div>
    );
  }
}

export default Button;
