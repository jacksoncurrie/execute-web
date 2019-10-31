// Libraries
import React from "react";

// Styles
import "../styles/Tasks.css";

class Tasks extends React.Component {
  state = {
    highTasks: [],
    mediumTasks: [],
    lowTasks: [],
    noneTasks: []
  };

  // Data filter functions
  getItemFromId = async id => {
    let res = await this.props.tasks();
    res = res.filter(data => data.taskID === id);
    return res.map(i => ({
      id: i.taskID,
      title: i.title,
      input2: i.priority,
      input3: i.estimatedTime,
      input4: i.startTime
    }))[0]; // Get only one item
  };

  getItemForPriority = async priority => {
    let res = await this.props.tasks();
    res = res.filter(data => data.priority === priority);
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
      highTasks: await this.getItemForPriority(3),
      mediumTasks: await this.getItemForPriority(2),
      lowTasks: await this.getItemForPriority(1),
      noneTasks: await this.getItemForPriority(0)
    });
  }

  render() {
    return (
      <div className="tasks-list">
        <div className="tasks-grid">
          <div className="tasks-titles">
            <div
              className="high-title"
              onClick={async () => {
                let res = await this.getItemForPriority(3);
                if (res.length === 0) return this.props.addNewTask(null);
                else return this.props.openNewItemList(res, "High Priority");
              }}
            >
              <h3>High</h3>
            </div>
            <div
              className="medium-title"
              onClick={async () => {
                let res = await this.getItemForPriority(2);
                if (res.length === 0) return this.props.addNewTask(null);
                else return this.props.openNewItemList(res, "Medium Priority");
              }}
            >
              <h3>Medium</h3>
            </div>
            <div
              className="low-title"
              onClick={async () => {
                let res = await this.getItemForPriority(1);
                if (res.length === 0) return this.props.addNewTask(null);
                else return this.props.openNewItemList(res, "Low Priority");
              }}
            >
              <h3>Low</h3>
            </div>
            <div
              className="none-title"
              onClick={async () => {
                let res = await this.getItemForPriority(0);
                if (res.length === 0) return this.props.addNewTask(null);
                else return this.props.openNewItemList(res, "No Priority");
              }}
            >
              <h3>None</h3>
            </div>
          </div>
          <div className="tasks-content">
            <div className="high-content">
              {this.state.highTasks.map((data, idx) => (
                <button key={idx} onClick={async () => this.props.updateTask(await this.getItemFromId(data.id))}>
                  <strong>{data.title}</strong>
                </button>
              ))}
            </div>
            <div className="medium-content">
              {this.state.mediumTasks.map((data, idx) => (
                <button key={idx} onClick={async () => this.props.updateTask(await this.getItemFromId(data.id))}>
                  <strong>{data.title}</strong>
                </button>
              ))}
            </div>
            <div className="low-content">
              {this.state.lowTasks.map((data, idx) => (
                <button key={idx} onClick={async () => this.props.updateTask(await this.getItemFromId(data.id))}>
                  <strong>{data.title}</strong>
                </button>
              ))}
            </div>
            <div className="none-content">
              {this.state.noneTasks.map((data, idx) => (
                <button key={idx} onClick={async () => this.props.updateTask(await this.getItemFromId(data.id))}>
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
