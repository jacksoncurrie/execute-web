import React from "react";

class AddItem extends React.Component {
  render() {
    return (
      <div className="outerPopupWrapper">
        <div className="innerPopoutContainer">
          <div className="popup-header">
            <div className="left-popup-group">
              {this.props.canGoBack ? (
                <button onClick={this.props.goBack}>
                  <img src="#" className="App-logo" alt="back icon" />
                </button>
              ) : null}
            </div>
            <div className="center-popup-group">
              <h3>{this.props.title} Item</h3>
            </div>
            <div className="right-popup-group">
              <button onClick={this.props.close}>
                <img src="#" className="App-logo" alt="close icon" />
              </button>
            </div>
          </div>
          <div className="popup-form">
            <form name="signIn" onSubmit={this.props.submitForm}>
              <div>
                <label htmlFor="title">Title:</label>
              </div>
              <div>
                <input name="title" type="text"></input>
              </div>
              <div>
                <label htmlFor="input2">Password:</label>
              </div>
              <div>
                <input name="input2" type="text"></input>
              </div>
              <p>{this.props.errorMessage}</p>
              <div>
                <input type="submit" value="Item" />
              </div>
              <div>
                {this.props.type !== "add" ? (
                  <input
                    type="button"
                    value="Delete Item"
                    onClick={this.props.deleteItem}
                  />
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddItem;
