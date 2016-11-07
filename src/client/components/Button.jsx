import React, { Component } from 'react';

const propTypes = {
  buttonClick: React.PropTypes.func,
};

class Button extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div id="button_container">
          <button
            className="button big-button"
            onClick={this.props.buttonClick}
          >Feeling Guilty?</button>
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
