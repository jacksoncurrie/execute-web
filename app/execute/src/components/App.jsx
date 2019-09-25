import React from "react";
import SignIn from "./SignIn.jsx";
import AddItem from "./AddItem.jsx";
import ItemList from "./ItemList.jsx";
import Calendar from "./Calendar.jsx";
import Schedule from "./Schedule.jsx";
import Tasks from "./Tasks.jsx";

class App extends React.Component {
  state = {
    currentPage: <Calendar />,
    isSignIn: true,
    signInError: "",
    isAddItem: false,
    isItemList: false,
    canGoBack: false,
    addItemType: "add",
    addItemModule: "calendar",
    addItemTitle: "",
    addItemInput2: "",
    addItemInput3: ""
  };

  openAddItem = (type, canGoBackButton) => {
    this.setState({
      isAddItem: true,
      isItemList: false,
      isSignIn: false,
      canGoBack: canGoBackButton,
      addItemType: type
    });
  };

  openItemList = () => {
    this.setState({
      isAddItem: false,
      isItemList: true,
      isSignIn: false
    });
  };

  openSignIn = () => {
    this.setState({
      isAddItem: false,
      isItemList: false,
      isSignIn: true
    });
  };

  closePopups = () => {
    this.setState({
      isAddItem: false,
      isItemList: false,
      isSignIn: false
    });
  };

  signInUser = e => {
    console.log(
      "Logged in: " + e.target.username.value + " " + e.target.password.value
    );
    this.closePopups();
    e.preventDefault();
  };

  signOutUser = () => {
    console.log("User signed out.");
  };

  addItemSubmit = () => {
    console.log("Added item");
  };

  moduleItemClicked = e => {
    switch (e.currentTarget.id) {
      case "calendar-module":
        // Set to calendar component
        this.setState({
          currentPage: <Calendar />,
          addItemModule: "calendar"
        });
        break;
      case "schedule-module":
        // Set to scheudle component
        this.setState({
          currentPage: <Schedule />,
          addItemModule: "schedule"
        });
        break;
      case "tasks-module":
        // Set to tasks component
        this.setState({
          currentPage: <Tasks />,
          addItemModule: "tasks"
        });
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
            <button onClick={() => this.openAddItem("add", false)}>
              <img src="#" className="App-logo" alt="add icon" />
            </button>
          </div>
          <div className="center-header-group">
            <img src="#" className="App-logo" alt="logo" />
            <h3>EXECUTE</h3>
          </div>
          <div className="right-header-group">
            <button onClick={this.signOutUser}>
              <img src="#" className="App-logo" alt="sign out icon" />
            </button>
          </div>
        </header>

        <main>{this.state.currentPage}</main>

        <footer>
          <div className="left-footer-group footer-group">
            <button
              id="calendar-module"
              className="module-group"
              onClick={this.moduleItemClicked}
            >
              <img src="#" className="App-logo" alt="calendar icon" />
              <h4 className="footer-group-caption">Calendar</h4>
            </button>
          </div>
          <div className="center-footer-group footer-group">
            <button
              id="schedule-module"
              className="module-group"
              onClick={this.moduleItemClicked}
            >
              <img src="#" className="App-logo" alt="scheudle icon" />
              <h4 className="footer-group-caption">Schedule</h4>
            </button>
          </div>
          <div className="right-footer-group footer-group">
            <button
              id="tasks-module"
              className="module-group"
              onClick={this.moduleItemClicked}
            >
              <img src="#" className="App-logo" alt="tasks icon" />
              <h4 className="footer-group-caption">Tasks</h4>
            </button>
          </div>
        </footer>

        {/* Popup Components */}
        {this.state.isSignIn ? (
          <SignIn
            signInUser={this.submitSignIn}
            errorMessage={this.state.error}
          />
        ) : null}
        {this.state.isItemList ? <ItemList /> : null}
        {this.state.isAddItem ? (
          <AddItem
            type={this.state.addItemType}
            module={this.state.addItemModule}
            canGoBack={this.state.canGoBack}
            title={this.state.addItemTitle}
            input2={this.state.addItemInput2}
            input3={this.state.addItemInput3}
            goBack={this.openItemList}
            close={this.closePopups}
            submitForm={this.addItemSubmit}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
