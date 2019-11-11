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
    currentMonth: 0,
    currentYear: 2019,
    calendarItems: []
  };

  today;
  currentMonth = 0;
  currentYear = 2019;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  hasItems = false;

  // Used to get the data syncronously for render method
  getDotForDay = day => {
    let res = this.state.calendarItems;
    let selectedDay = new Date(`${this.currentYear}-${this.currentMonth + 1}-${day}`);
    res = res.filter(data => {
      let startDay = new Date(data.startTime);
      let endDay = new Date(data.endTime);
      // Check for the days an item falls on
      return (
        (selectedDay < endDay && selectedDay > startDay) ||
        (startDay.getFullYear() === selectedDay.getFullYear() &&
          startDay.getMonth() === selectedDay.getMonth() &&
          startDay.getDate() === selectedDay.getDate()) ||
        (endDay.getFullYear() === selectedDay.getFullYear() &&
          endDay.getMonth() === selectedDay.getMonth() &&
          endDay.getDate() === selectedDay.getDate())
      );
    });
    return res.length > 0;
  }

  // Gets data directly from database
  getItemForDay = async day => {
    let res = await this.props.calendarItems();
    let selectedDay = new Date(day);
    res = res.filter(data => {
      let startDay = new Date(data.startTime);
      let endDay = new Date(data.endTime);
      // Check for the days an item falls on
      return (
        (selectedDay < endDay && selectedDay > startDay) ||
        (startDay.getFullYear() === selectedDay.getFullYear() &&
          startDay.getMonth() === selectedDay.getMonth() &&
          startDay.getDate() === selectedDay.getDate()) ||
        (endDay.getFullYear() === selectedDay.getFullYear() &&
          endDay.getMonth() === selectedDay.getMonth() &&
          endDay.getDate() === selectedDay.getDate())
      );
    });
    return res.map(i => ({
      id: i.calendarItemID,
      title: i.title,
      input2: i.startTime,
      input3: i.endTime
    }));
  };

  goForward = () => {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.setState({
        currentMonth: 0,
        currentYear: this.state.currentYear + 1
      });
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
      this.setState({
        currentMonth: 11,
        currentYear: this.setState.currentYear - 1
      });
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

  async componentDidMount() {
    // When app starts load grid for today
    this.today = new Date();
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.setState({
      currentMonth: this.today.getMonth(),
      currentYear: this.today.getFullYear(),
      calendarItems: await this.props.calendarItems()
    });
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
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
            {this.state.calendar.map((value, index) => (
              <div key={index} className="calendar-row">
                {value.map((day, idx) => {
                  return day === 0 ? (
                    <div key={idx}></div>
                  ) : (
                    <div
                      key={idx}
                      onClick={async () => {
                        let res = await this.getItemForDay(`${this.currentYear}-${this.currentMonth + 1}-${day}`);
                        if (res.length === 0) this.props.addNewCalendarItem(null);
                        else return this.props.openDay(res, new Date(`${this.currentYear}-${this.currentMonth + 1}-${day}`).toDateString());
                      }}
                      className={
                        this.state.currentMonth === this.today.getMonth() &&
                        day === this.today.getDate() &&
                        this.state.currentYear === this.today.getFullYear()
                          ? "calendar-day current-day"
                          : "calendar-day"
                      }
                    >
                      {day}
                      {this.getDotForDay(day) ? <div className="dot">&#9679;</div> : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
