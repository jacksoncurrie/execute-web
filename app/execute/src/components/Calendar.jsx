// Libraries
import React from "react";
import CalendarHelper from "calendar";

// Images
import LeftIcon from "../images/left-icon.svg";
import RightIcon from "../images/right-icon.svg";

// Styles
import "../styles/Calendar.css";

class Calendar extends React.Component {
  state = {
    calendar: [],
    date: "February, 2019",
    currentMonth: 0
  };

  today;
  currentMonth = 0;
  currentYear = 2019;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  goForward = () => {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.setState({ currentMonth: 0 });
      this.currentYear++;
    } else {
      this.currentMonth++;
      this.setState({
        currentMonth: this.state.currentMonth + 1
      });
    }
    this.getCalendar();
  };

  goBack = () => {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.setState({ currentMonth: 11 });
      this.currentYear--;
    } else {
      this.currentMonth--;
      this.setState({
        currentMonth: this.state.currentMonth - 1
      });
    }
    this.getCalendar();
  };

  getCalendar = () => {
    let cal = new CalendarHelper.Calendar(1);
    this.setState({
      calendar: cal.monthDays(this.currentYear, this.currentMonth),
      date: `${this.months[this.currentMonth]}, ${this.currentYear}`
    });
  };

  componentDidMount() {
    // When app starts load grid for today
    this.today = new Date();
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.setState({
      currentMonth: this.today.getMonth()
    })
    this.getCalendar();
  }

  render() {
    return (
      <div className="calendar-container">
        <div className="calendar-grid">
          <div className="calendar-heading">
            <button onClick={this.goBack}>
              <img src={LeftIcon} className="back-icon" alt="back icon" />
            </button>
            <h2>{this.state.date}</h2>
            <button onClick={this.goForward}>
              <img src={RightIcon} className="forward-icon" alt="forward icon" />
            </button>
          </div>
          <div className="calendar-body">
            <div className="calendar-headings">
              <div>Monday</div>
              <div>Tuesday</div>
              <div>Wednesday</div>
              <div>Thursday</div>
              <div>Friday</div>
              <div>Saturday</div>
              <div>Sunday</div>
            </div>
            {this.state.calendar.map((value, index) => (
              <div key={index} className="calendar-row">
                {value.map((day, idx) =>
                  day === 0 ? (
                    <div key={idx}></div>
                  ) : (
                    <div
                      key={idx}
                      onClick={this.props.openDay}
                      className={
                        this.state.currentMonth === this.today.getMonth() && day === this.today.getDate()
                          ? "calendar-day current-day"
                          : "calendar-day"
                      }
                    >
                      {day}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
