import React from "react";
import SignIn from "./SignIn.jsx";
import AddItem from "./AddItem.jsx";
import ItemList from "./ItemList.jsx";
import Calendar from "./Calendar.jsx";
import Schedule from "./Schedule.jsx";
import Tasks from "./Tasks.jsx";

class App extends React.Component {
  state = {
    currentPage: <Calendar />
  };

  addClicked = () => {
    // Open sign in popup component
    console.log("Add button clicked");
  };

  signOutClicked = () => {
    console.log("Sign out button clicked");
  };

  moduleItemClicked = e => {
    switch (e.currentTarget.id) {
      case "calendar-module":
        // Set to calendar component
        this.setState({ currentPage: <Calendar /> });
        break;
      case "schedule-module":
        // Set to scheudle component
        this.setState({ currentPage: <Schedule /> });
        break;
      case "tasks-module":
        // Set to tasks component
        this.setState({ currentPage: <Tasks /> });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="left-header-group">
            <div onClick={this.addClicked}>
              <img src="#" className="App-logo" alt="add icon" />
            </div>
          </div>
          <div className="center-header-group">
            <img src="#" className="App-logo" alt="logo" />
            <h3>EXECUTE</h3>
          </div>
          <div className="right-header-group">
            <div onClick={this.signOutClicked}>
              <img src="#" className="App-logo" alt="sign out icon" />
            </div>
          </div>
        </header>

        <main>{this.state.currentPage}</main>

        <footer>
          <div className="left-footer-group footer-group">
            <div
              id="calendar-module"
              className="module-group"
              onClick={this.moduleItemClicked}
            >
              <img src="#" className="App-logo" alt="calendar icon" />
              <h4 className="footer-group-caption">Calendar</h4>
            </div>
          </div>
          <div className="center-footer-group footer-group">
            <div
              id="schedule-module"
              className="module-group"
              onClick={this.moduleItemClicked}
            >
              <img src="#" className="App-logo" alt="scheudle icon" />
              <h4 className="footer-group-caption">Schedule</h4>
            </div>
          </div>
          <div className="right-footer-group footer-group">
            <div
              id="tasks-module"
              className="module-group"
              onClick={this.moduleItemClicked}
            >
              <img src="#" className="App-logo" alt="tasks icon" />
              <h4 className="footer-group-caption">Tasks</h4>
            </div>
          </div>
        </footer>

        {/* Popup Components */}
        <SignIn />
        <ItemList />
        <AddItem />
      </div>
    );
  }
}

export default App;
