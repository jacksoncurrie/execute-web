// Libraries
import React from "react";

// Images
import BackIcon from "../images/back-icon.svg";
import CloseIcon from "../images/close-icon.svg";

class AddItem extends React.Component {
  state = {
    input2: "",
    input3: "",
    input4: ""
  };

  componentDidMount() {
    switch (this.props.module) {
      case "calendar":
        // Set to calendar component
        this.setState({
          input2: "Start Time",
          input3: "End Time",
          input4: null
        });
        break;
      case "schedule":
        // Set to scheudle component
        this.setState({
          input2: "Category",
          input3: "Start Time",
          input4: "End Time"
        });
        break;
      case "tasks":
        // Set to tasks component
        this.setState({
          input2: "Priority",
          input3: "Estimated Time",
          input4: "Start Time"
        });
        break;
      default:
        break;
    }
  }

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
                <input tabIndex="1" name="title" type="text" defaultValue={this.props.data.title || ""} />
              </div>
              <div>
                <label htmlFor="input2">
                  <strong>{this.state.input2}:</strong>
                </label>
              </div>
              <div>
                <input tabIndex="2" name="input2" type="text" defaultValue={this.props.data.input2 || ""} />
              </div>
              <div>
                <label htmlFor="input3">
                  <strong>{this.state.input3}:</strong>
                </label>
              </div>
              <div>
                <input tabIndex="3" name="input3" type="text" defaultValue={this.props.data.input3 || ""} />
              </div>
              {this.state.input4 ? (
                <div>
                  <div>
                    <label htmlFor="input4">
                      <strong>{this.state.input4}:</strong>
                    </label>
                  </div>
                  <div>
                    <input tabIndex="4" name="input4" type="text" defaultValue={this.props.data.input4 || ""} />
                  </div>
                </div>
              ) : null}
              <p>{this.props.errorMessage}</p>
              <div>
                <input tabIndex="5" type="submit" value={this.props.add} />
                {this.props.type !== "add" ? <button tabIndex="6" onClick={this.props.deleteItem}>Delete Item</button> : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddItem;
