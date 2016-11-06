import React, { Component } from 'react';

const propTypes = {
  clicks: React.PropTypes.number,
  cost_per_click: React.PropTypes.number,
};

class Counter extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>You should be giving</h2>
        <h1>${this.props.clicks * this.props.cost_per_click}</h1>
        <h3>this month</h3>

      </div>
    );
  }
}

Counter.propTypes = propTypes;

export default Counter;
