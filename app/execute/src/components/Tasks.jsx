// Libraries
import React from "react";

// Styles
import "../styles/Tasks.css";

class Tasks extends React.Component {
  state = {
    tasks: []
  };

  // Data filter functions
  getItemFromId = id => {
    let res = this.state.tasks.filter(data => data.taskID === id);
    return res.map(i => ({
      id: i.taskID,
      title: i.title,
      input2: i.priority,
      input3: i.estimatedTime,
      input4: i.startTime
    }))[0]; // Get only one item
  };

  getItemForPriority = priority => {
    let res = this.state.tasks.filter(data => data.priority === priority);
    return res.map(i => ({
      id: i.taskID,
      title: i.title,
      time: i.estimatedTime + "m",
      input2: i.priority,
      input3: i.estimatedTime,
      input4: i.startTime
    }));
  } 

  async componentDidMount() {
    this.setState({
      tasks: await this.props.tasks()
    });
  }

  render() {
    return (
      <div className="tasks-list">
        <div className="tasks-grid">
          <div className="tasks-titles">
            <div className="high-title" onClick={() => this.props.openNewItemList(this.getItemForPriority(3), "High Priority")}>
              <h3>High</h3>
            </div>
            <div className="medium-title" onClick={() => this.props.openNewItemList(this.getItemForPriority(2), "Medium Priority")}>
              <h3>Medium</h3>
            </div>
            <div className="low-title" onClick={() => this.props.openNewItemList(this.getItemForPriority(1), "Low Priority")}>
              <h3>Low</h3>
            </div>
            <div className="none-title" onClick={() => this.props.openNewItemList(this.getItemForPriority(0), "No Priority")}>
              <h3>None</h3>
            </div>
          </div>
          <div className="tasks-content">
            <div className="high-content">
              {this.getItemForPriority(3).map((data, idx) => (
                <button key={idx} onClick={() => this.props.addNewTask(this.getItemFromId(data.id))}>
                  <strong>{data.title}</strong>
                </button>
              ))}
            </div>
            <div className="medium-content">
              {this.getItemForPriority(2).map((data, idx) => (
                <button key={idx} onClick={() => this.props.addNewTask(this.getItemFromId(data.id))}>
                  <strong>{data.title}</strong>
                </button>
              ))}
            </div>
            <div className="low-content">
              {this.getItemForPriority(1).map((data, idx) => (
                <button key={idx} onClick={() => this.props.addNewTask(this.getItemFromId(data.id))}>
                  <strong>{data.title}</strong>
                </button>
              ))}
            </div>
            <div className="none-content">
              {this.getItemForPriority(0).map((data, idx) => (
                <button key={idx} onClick={() => this.props.addNewTask(this.getItemFromId(data.id))}>
                  <strong>{data.title}</strong>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tasks;
