import React from "react";

class SignIn extends React.Component {
  render() {
    return (
      <div className="outer-popup-wrapper">
        <div className="inner-popout-container">
          <div className="popup-header">
            <div className="center-popup-group">
              <h3>Sign In</h3>
            </div>
          </div>
          <div className="popup-form">
            <form name="signIn" onSubmit={this.props.submitSignIn}>
              <div>
                <label htmlFor="username">
                  <strong>Username:</strong>
                </label>
              </div>
              <div>
                <input tabIndex="1" name="username" type="text" />
              </div>
              <div>
                <label htmlFor="password">
                  <strong>Password:</strong>
                </label>
              </div>
              <div>
                <input tabIndex="2" name="password" type="password" />
              </div>
              <p>{this.props.errorMessage}</p>
              <div>
                <input tabIndex="3" type="submit" value="Sign In" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
