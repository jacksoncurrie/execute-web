// Libraries
import React from "react";
import * as AppLogic from "../applicationLogic.js";

// Components
import SignIn from "./SignIn.jsx";
import AddItem from "./AddItem.jsx";
import ItemList from "./ItemList.jsx";
import Calendar from "./Calendar.jsx";
import Schedule from "./Schedule.jsx";
import Tasks from "./Tasks.jsx";

// Styles
import "../styles/App.css";
import "../styles/Popups.css";

// Images
import Logo from "../images/logo-small-nobackground.svg";
import AddIcon from "../images/add-icon.svg";
import SignOutIcon from "../images/signout-icon.svg";
import CalendarIcon from "../images/calendar-icon.svg";
import ScheduleIcon from "../images/schedule-icon.svg";
import TasksIcon from "../images/tasks-icon.svg";
import CalendarIconCurrent from "../images/calendar-icon-current.svg";
import ScheduleIconCurrent from "../images/schedule-icon-current.svg";
import TasksIconCurrent from "../images/tasks-icon-current.svg";

class App extends React.Component {
  // Application State Variables
  state = {
    currentPage: "schedule",
    isSignIn: true,
    signInError: "",
    isAddItem: false,
    isItemList: false,
    canGoBack: false,
    addItemType: "add",
    addItemTitle: "Schedule",
    addItemInput2: "Start Date",
    addItemInput3: "End Date",
    addItemInput4: "",
    addItem: "Update Item",
    listTitle: "21st September 2019",
    items: [
      {
        id: "1234",
        title: "Pick up Sarah from the airport",
        time: "12:00 - 13:00"
      },
      {
        id: "5678",
        title: "Do laundry",
        time: "13:00 - 14:00"
      },
      {
        id: "1234",
        title: "Pick up Sarah from the airport",
        time: "12:00 - 13:00"
      },
      {
        id: "5678",
        title: "Do laundry",
        time: "13:00 - 14:00"
      },
      {
        id: "1234",
        title: "Pick up Sarah from the airport",
        time: "12:00 - 13:00"
      },
      {
        id: "5678",
        title: "Do laundry",
        time: "13:00 - 14:00"
      }
    ]
  };

  // Application Events
  openAddItem = (type, desc, canGoBackButton) => {
    this.setState({
      isAddItem: true,
      isItemList: false,
      isSignIn: false,
      canGoBack: canGoBackButton,
      addItemType: type,
      addItem: desc
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

  signInUser = async e => {
    e.preventDefault();
    if (await AppLogic.login(e.target.username.value, e.target.password.value)) {
      this.closePopups();
      this.setState({
        error: ""
      });
    } else {
      this.setState({
        error: "Incorrect Details"
      });
    }
  };

  signOutUser = e => {
    console.log("User signed out.");
    this.openSignIn();
    e.preventDefault();
  };

  addItemSubmit = e => {
    console.log("Added item");
    e.preventDefault();
  };

  deleteItem = e => {
    console.log("Item deleted");
    e.preventDefault();
  };

  openItemToUpdate = e => {
    console.log("Item clicked to open: " + e.currentTarget.id);
    this.openAddItem("update", "Update Item", true);
  };

  moduleItemClicked = e => {
    switch (e.currentTarget.id) {
      case "calendar-module":
        // Set to calendar component
        this.setState({
          currentPage: "calendar",
          addItemTitle: "Calendar"
        });
        break;
      case "schedule-module":
        // Set to scheudle component
        this.setState({
          currentPage: "schedule",
          addItemTitle: "Schedule"
        });
        break;
      case "tasks-module":
        // Set to tasks component
        this.setState({
          currentPage: "tasks",
          addItemTitle: "Tasks"
        });
        break;
      default:
        break;
    }
  };

  // Application Page
  render() {
    return (
      <div className="App">
        {/* Application Header */}
        <header className="App-header">
          <div className="left-header-group">
            <button onClick={() => this.openAddItem("add", "Add Item", false)}>
              <img src={AddIcon} className="header-icon" alt="add icon" />
            </button>
          </div>
          <div className="center-header-group">
            <img src={Logo} className="app-logo-img" alt="logo" />
            <h3 className="app-logo-heading">EXECUTE</h3>
          </div>
          <div className="right-header-group">
            <button onClick={this.signOutUser}>
              <img src={SignOutIcon} className="header-icon" alt="sign out icon" />
            </button>
          </div>
        </header>

        <main>
          {/* Main Components */}
          {this.state.currentPage === "calendar" ? <Calendar openDay={this.openItemList} /> : null}
          {this.state.currentPage === "schedule" ? <Schedule openDay={this.openItemList} /> : null}
          {this.state.currentPage === "tasks" ? (
            <Tasks addNewTask={() => this.openAddItem("update", "Update Item", false)} openNewItemList={this.openItemList} />
          ) : null}

          {/* Popup Components */}
          {this.state.isSignIn ? <SignIn submitSignIn={this.signInUser} errorMessage={this.state.error} /> : null}
          {this.state.isItemList ? (
            <ItemList
              addItem={() => this.openAddItem("add", "Add Item", true)}
              title={this.state.listTitle}
              close={this.closePopups}
              items={this.state.items}
              openItem={this.openItemToUpdate}
            />
          ) : null}
          {this.state.isAddItem ? (
            <AddItem
              type={this.state.addItemType}
              module={this.state.currentPage}
              canGoBack={this.state.canGoBack}
              title={this.state.addItemTitle}
              input2={this.state.addItemInput2}
              input3={this.state.addItemInput3}
              input4={this.state.addItemInput4}
              goBack={this.openItemList}
              close={this.closePopups}
              submitForm={this.addItemSubmit}
              add={this.state.addItem}
              deleteItem={this.deleteItem}
            />
          ) : null}
        </main>

        {/* Application Footer */}
        <footer>
          <div className="left-footer-group footer-group">
            <button id="calendar-module" className="module-group" onClick={this.moduleItemClicked}>
              <img src={this.state.currentPage === "calendar" ? CalendarIconCurrent : CalendarIcon} className="footer-icon" alt="calendar icon" />
              <h4 className={this.state.currentPage === "calendar" ? "currentPage footer-group-caption" : "footer-group-caption"}>Calendar</h4>
            </button>
          </div>
          <div className="center-footer-group footer-group">
            <button id="schedule-module" className="module-group" onClick={this.moduleItemClicked}>
              <img src={this.state.currentPage === "schedule" ? ScheduleIconCurrent : ScheduleIcon} className="footer-icon" alt="scheudle icon" />
              <h4 className={this.state.currentPage === "schedule" ? "currentPage footer-group-caption" : "footer-group-caption"}>Schedule</h4>
            </button>
          </div>
          <div className="right-footer-group footer-group">
            <button id="tasks-module" className="module-group" onClick={this.moduleItemClicked}>
              <img src={this.state.currentPage === "tasks" ? TasksIconCurrent : TasksIcon} className="footer-icon" alt="tasks icon" />
              <h4 className={this.state.currentPage === "tasks" ? "currentPage footer-group-caption" : "footer-group-caption"}>Tasks</h4>
            </button>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
