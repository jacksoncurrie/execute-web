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
          input3: "Estimated Time (m)",
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
                {this.props.module === "tasks" ? (
                  <select
                    className="selectPriority"
                    name="input2"
                    defaultValue={this.props.data.input2 !== undefined ? this.props.data.input2 : "-1"}
                    tabIndex="2"
                  >
                    <option value="-1" disabled>
                      Select Priority
                    </option>
                    <option value="0">None</option>
                    <option value="1">Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                  </select>
                ) : this.props.module === "schedule" ? (
                  <select
                    className="selectPriority"
                    name="input2"
                    defaultValue={this.props.data.input2 !== undefined ? this.props.data.input2.toString() : "-1"}
                    tabIndex="2"
                  >
                    <option value="-1" disabled>
                      Select Category
                    </option>
                    <option value="0">Work</option>
                    <option value="1">Exercise</option>
                    <option value="2">Relax</option>
                    <option value="3">Art</option>
                  </select>
                ) : (
                  <div>
                    <input
                      tabIndex="2"
                      name="input21"
                      type="date"
                      className="split split1"
                      defaultValue={this.props.data.input2 ? this.props.data.input2.split("T")[0] : ""}
                    />
                    <input
                      tabIndex="2"
                      name="input22"
                      type="time"
                      className="split split2"
                      defaultValue={this.props.data.input2 ? this.props.data.input2.split("T")[1] : ""}
                    />
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="input3">
                  <strong>{this.state.input3}:</strong>
                </label>
              </div>
              <div>
                {this.props.module === "tasks" ? (
                  <input tabIndex="3" name="input3" type="number" min="1" defaultValue={this.props.data.input3 || ""} />
                ) : this.props.module === "schedule" ? (
                  <div>
                    <select
                      className="split split1"
                      name="input31"
                      defaultValue={this.props.data.input3 !== undefined ? this.props.data.input3.split("T")[0] : "-1"}
                      tabIndex="3"
                    >
                      <option value="-1" disabled>
                        Select Day
                      </option>
                      <option value="0">Monday</option>
                      <option value="1">Tuesday</option>
                      <option value="2">Wednesday</option>
                      <option value="3">Thursday</option>
                      <option value="4">Friday</option>
                      <option value="5">Saturday</option>
                      <option value="6">Sunday</option>
                    </select>
                    <input
                      tabIndex="3"
                      name="input32"
                      type="time"
                      className="split split2"
                      defaultValue={this.props.data.input3 ? this.props.data.input3.split("T")[1] : ""}
                    />
                  </div>
                ) : (
                  <div>
                    <input
                      tabIndex="3"
                      name="input31"
                      type="date"
                      className="split split1"
                      defaultValue={this.props.data.input3 ? this.props.data.input3.split("T")[0] : ""}
                    />
                    <input
                      tabIndex="3"
                      name="input32"
                      type="time"
                      className="split split2"
                      defaultValue={this.props.data.input3 ? this.props.data.input3.split("T")[1] : ""}
                    />
                  </div>
                )}
              </div>
              {this.state.input4 ? (
                this.props.module === "tasks" && this.props.type === "add" ? null : (
                  <div>
                    <div>
                      <label htmlFor="input4">
                        <strong>{this.state.input4}:</strong>
                      </label>
                    </div>
                    <div>
                      {this.props.module === "tasks" ? (
                        <input
                          tabIndex="4"
                          name="input41"
                          type="date"
                          className="split split1"
                          defaultValue={this.props.data.input4 ? this.props.data.input4.split("T")[0] : ""}
                        />
                      ) : (
                        <select
                          className="split split1"
                          name="input41"
                          defaultValue={this.props.data.input4 !== undefined ? this.props.data.input4.split("T")[0] : "-1"}
                          tabIndex="4"
                        >
                          <option value="-1" disabled>
                            Select Day
                          </option>
                          <option value="0">Monday</option>
                          <option value="1">Tuesday</option>
                          <option value="2">Wednesday</option>
                          <option value="3">Thursday</option>
                          <option value="4">Friday</option>
                          <option value="5">Saturday</option>
                          <option value="6">Sunday</option>
                        </select>
                      )}
                      <input
                        tabIndex="5"
                        name="input42"
                        type="time"
                        className="split split2"
                        defaultValue={this.props.data.input4 ? this.props.data.input4.split("T")[1] : ""}
                      />
                    </div>
                  </div>
                )
              ) : null}
              <p>{this.props.errorMessage}</p>
              <div>
                <input tabIndex="5" type="submit" value={this.props.add} />
                {this.props.type !== "add" ? (
                  <button tabIndex="6" onClick={this.props.deleteItem}>
                    Delete Item
                  </button>
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
