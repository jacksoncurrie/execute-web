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
    isSignIn: false,
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
        time: "12:00 - 13:00",
        input2: "test2",
        input3: "test3",
        input4: "3T00:00"
      }
    ],
    currentItem: {},
    refreshRequired: false
  };

  // Application Events
  openAddItem = (type, desc, canGoBackButton, data) => {
    this.setState({
      isAddItem: true,
      isItemList: false,
      isSignIn: false,
      canGoBack: canGoBackButton,
      addItemType: type,
      addItem: desc,
      currentItem: data || {}
    });
  };

  openItemList = (data, title) => {
    if (data) {
      this.setState({
        isAddItem: false,
        isItemList: true,
        isSignIn: false,
        items: data,
        listTitle: title
      });
    } else {
      this.setState({
        isAddItem: false,
        isItemList: true,
        isSignIn: false
      });
    }
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

  addItemSubmit = async e => {
    // Do not refresh page
    e.preventDefault();

    // Get current page
    switch (this.state.currentPage) {
      case "calendar":
        if (this.state.currentItem.id) {
          // Update Calender Item
          await AppLogic.updateCalendarItem(
            this.state.currentItem.id,
            e.target.title.value,
            e.target.input21.value,
            e.target.input22.value,
            e.target.input31.value,
            e.target.input32.value
          );
        } else {
          // Add Calendar item         
          await AppLogic.addCalendarItem(
            e.target.title.value,
            e.target.input21.value,
            e.target.input22.value,
            e.target.input31.value,
            e.target.input32.value
          );
        }
        break;

      case "schedule":
        if (this.state.currentItem.id) {
          // Update schedule item
          await AppLogic.updateScheduleItem(
            this.state.currentItem.id,
            e.target.title.value,
            e.target.input2.value,
            `${e.target.input31.value}T${e.target.input32.value}`,
            `${e.target.input41.value}T${e.target.input42.value}`
          );
        } else {
          // Add schedule item
          await AppLogic.addScheduleItem(
            e.target.title.value,
            e.target.input2.value,
            e.target.input31.value + "T" + e.target.input32.value,
            e.target.input41.value + "T" + e.target.input42.value
          );
        }
        break;

      case "tasks":
        if (this.state.currentItem.id) {
          // Update task
          await AppLogic.updateTask(
            this.state.currentItem.id,
            e.target.title.value,
            e.target.input2.value,
            e.target.input3.value,
            e.target.input41.value,
            e.target.input42.value
          );
          this.setState(this.state);
        } else {
          // Add task
          await AppLogic.addTask(e.target.title.value, e.target.input2.value, e.target.input3.value);
        }
        break;

      default:
        // Error occured don't close popup
        console.error("Unexpected error occured");
        return;
    }

    // Refresh component
    this.setState({ refreshRequired: !this.state.refreshRequired });

    // Close dialog once completed
    this.closePopups();
  };

  deleteItem = async e => {
    // Do not refresh page
    e.preventDefault();

    // Get current page
    switch (this.state.currentPage) {
      case "calendar":
        // Remove calendar item
        await AppLogic.removeCalendarItem(this.state.currentItem.id);
        break;

      case "schedule":
        // Remove scheudle item
        await AppLogic.removeScheduleItem(this.state.currentItem.id);
        break;

      case "tasks":
        //Remove task
        await AppLogic.removeTask(this.state.currentItem.id);
        break;

      default:
        // Error occured don't close popup
        console.error("Unexpected error occured");
        return;
    }

    // Refresh component
    this.setState({ refreshRequired: !this.state.refreshRequired });

    // Close dialog once completed
    this.closePopups();
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

  getTasks = async () => {
    return await AppLogic.getAllTasks();
  };

  getSchedule = async (startDate, endDate) => {
    return await AppLogic.getThisWeeksSchedule(startDate, endDate);
  }

  getCalendarItems = async () => {
    return await AppLogic.getAllCalendarItems();
  };

  componentDidMount() {
    let user = AppLogic.getCookie();
    if (!user)
      this.openSignIn();
  }

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
          {this.state.currentPage === "calendar" ? (
            <Calendar
              key={this.state.refreshRequired}
              refreshRequired={this.state.refreshRequired}
              openDay={(data, title) => this.openItemList(data, title)}
              addNewCalendarItem={data => this.openAddItem("add", "Add Item", false, data)}
              calendarItems={this.getCalendarItems}
            />
          ) : null}
          {this.state.currentPage === "schedule" ? (
            <Schedule
              key={this.state.refreshRequired}
              refreshRequired={this.state.refreshRequired}
              schedule={(startDate, endDate) => this.getSchedule(startDate, endDate)}
              openDay={(data, title) => this.openItemList(data, title)}
              addNewItem={data => this.openAddItem("add", "Add Item", false, data)}
            />
          ) : null}
          {this.state.currentPage === "tasks" ? (
            <Tasks
              key={this.state.refreshRequired}
              refreshRequired={this.state.refreshRequired}
              addNewTask={data => this.openAddItem("add", "Add Item", false, data)}
              updateTask={data => this.openAddItem("update", "Update Item", false, data)}
              openNewItemList={(data, title) => this.openItemList(data, title)}
              tasks={this.getTasks}
            />
          ) : null}

          {/* Popup Components */}
          {this.state.isSignIn ? <SignIn submitSignIn={this.signInUser} errorMessage={this.state.error} /> : null}
          {this.state.isItemList ? (
            <ItemList
              addItem={() => this.openAddItem("add", "Add Item", true)}
              title={this.state.listTitle}
              close={this.closePopups}
              items={[...this.state.items].sort((a, b) => a.time > b.time)}
              openItem={data => this.openAddItem("update", "Update Item", true, data)}
            />
          ) : null}
          {this.state.isAddItem ? (
            <AddItem
              type={this.state.addItemType}
              module={this.state.currentPage}
              canGoBack={this.state.canGoBack}
              title={this.state.addItemTitle}
              goBack={() => this.openItemList(null, null) /* Don't send through any data */}
              close={this.closePopups}
              submitForm={this.addItemSubmit}
              add={this.state.addItem}
              deleteItem={this.deleteItem}
              data={this.state.currentItem}
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
