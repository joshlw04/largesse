import React, { Component } from 'react';

const propTypes = {
  buttonClick: React.PropTypes.func,
};

class Button extends Component {
  constructor() {
    super();
  }

  // componentDidMount() {
  //   const userClicks = firebase.auth().currentUser.uid;
  //   request.get(`http://localhost:3000/api/v1/users/${userClicks}`)
  //          .then((response) => {
  //            console.log(response.body);
  //            this.setState({
  //              clicks: response.body.clicks.length,
  //            });
  //           console.log('PROPS', this.props);
  //          });
  // }

  // componentWillReceiveProps(props) {
  //   this.setState({
  //     user_id: 90,
  //   });
  // }


  render() {
    return (
      <div>
        <div id="button_container">
          <button className="btn" onClick={this.props.buttonClick}>Feeling Guilty?</button>
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
