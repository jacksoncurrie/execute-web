// Libraries
import React from "react";

// Styles
import "../styles/Tasks.css";

class Tasks extends React.Component {
  state = {
    //currentPage : <h1>Calendar</h1> // The component
  };

  render() {
    return (
      <div className="tasks-list">
        <div className="tasks-grid">
          <div className="tasks-titles">
            <div className="high-title" onClick={this.props.openNewItemList}>
              <h3>High</h3>
            </div>
            <div className="medium-title" onClick={this.props.openNewItemList}>
              <h3>Medium</h3>
            </div>
            <div className="low-title" onClick={this.props.openNewItemList}>
              <h3>Low</h3>
            </div>
            <div className="none-title" onClick={this.props.openNewItemList}>
              <h3>None</h3>
            </div>
          </div>
          <div className="tasks-content">
            <div className="high-content">
              <button onClick={this.props.addNewTask}>
                <strong>Fix car 1</strong>
              </button>
            </div>
            <div className="medium-content">
              <button onClick={this.props.addNewTask}>
                <strong>Fix car 2</strong>
              </button>
            </div>
            <div className="low-content">
              <button onClick={this.props.addNewTask}>
                <strong>Fix car 3</strong>
              </button>
              <button onClick={this.props.addNewTask}>
                <strong>Fix car 3</strong>
              </button>
              <button onClick={this.props.addNewTask}>
                <strong>Fix car 3</strong>
              </button>
              <button onClick={this.props.addNewTask}>
                <strong>Fix car 3</strong>
              </button>
            </div>
            <div className="none-content">
              <button onClick={this.props.addNewTask}>
                <strong>Fix car 4</strong>
              </button>
              <button onClick={this.props.addNewTask}>
                <strong>Fix car 4</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tasks;
