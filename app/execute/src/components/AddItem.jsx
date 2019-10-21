// Libraries
import React from "react";

// Images
import BackIcon from "../images/back-icon.svg";
import CloseIcon from "../images/close-icon.svg";

class AddItem extends React.Component {
  render() {
    return (
      <div className="outer-popup-wrapper">
        <div className="inner-popout-container">
          <div className="popup-header">
            <div className="left-popup-group">
              {this.props.canGoBack ? (
                <button onClick={this.props.goBack}>
                  <img src={BackIcon} className="Back" alt="back icon" />
                </button>
              ) : null}
            </div>
            <div className="center-popup-group">
              <h3>{this.props.title} Item</h3>
            </div>
            <div className="right-popup-group">
              <button onClick={this.props.close}>
                <img src={CloseIcon} className="Close" alt="close icon" />
              </button>
            </div>
          </div>
          <div className="popup-form">
            <form name="signIn" onSubmit={this.props.submitForm}>
              <div>
                <label htmlFor="title">
                  <strong>Title:</strong>
                </label>
              </div>
              <div>
                <input name="title" type="text" />
              </div>
              <div>
                <label htmlFor="input2">
                  <strong>{this.props.input2}:</strong>
                </label>
              </div>
              <div>
                <input name="input2" type="text" />
              </div>
              <div>
                <label htmlFor="input3">
                  <strong>{this.props.input3}:</strong>
                </label>
              </div>
              <div>
                <input name="input3" type="text" />
              </div>
              {this.props.input4 !== "" ? (
                <div>
                  <div>
                    <label htmlFor="input4">
                      <strong>{this.props.input4}:</strong>
                    </label>
                  </div>
                  <div>
                    <input name="input4" type="text" />
                  </div>
                </div>
              ) : null}
              <p>{this.props.errorMessage}</p>
              <div>
                <input type="submit" value={this.props.add} />
                {this.props.type !== "add" ? <button onClick={this.props.deleteItem}>Delete Item</button> : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddItem;
