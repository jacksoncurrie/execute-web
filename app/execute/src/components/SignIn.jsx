import React from "react";

class SignIn extends React.Component {
  render() {
    return (
      <div className="outerPopupWrapper">
        <div className="innerPopoutContainer">
          <div className="center-popup-group">
            <h1>Sign In</h1>
          </div>
          <form name="signIn" onSubmit={this.props.submitSignIn}>
            <div>
              <label htmlFor="username">Username:</label>
            </div>
            <div>
              <input name="username" type="text" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
            </div>
            <div>
              <input name="password" type="password" />
            </div>
            <p>{this.props.errorMessage}</p>
            <div>
              <input type="submit" value="Sign In" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
