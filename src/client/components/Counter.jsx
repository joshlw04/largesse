import React, { Component } from 'react';

const propTypes = {
  clicks: React.PropTypes.number,
};

class Counter extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>You have saved yourself from guilt {this.props.clicks} times!</h1>
      </div>
    );
  }
}

Counter.propTypes = propTypes;

export default Counter;
