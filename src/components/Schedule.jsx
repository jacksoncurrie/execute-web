// Libraries
import React from "react";
import "datejs";

// Styles
import "../styles/Schedule.css";

// Icons
import LeftIcon from "../images/left-icon.svg";
import RightIcon from "../images/right-icon.svg";

class Schedule extends React.Component {
  state = {
    weekNumber: 0,
    year: 0,
    month: "",
    startDate: new Date.today(),
    endDate: new Date.today(),
    loopDate: new Date.today(),
    wholeSchedule: {
      calendarItems: [],
      scheduleItems: [],
      tasks: []
    }
  };

  // Constant days
  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Format data for list and updating items
  formatData = async day => {
    let res = await this.props.schedule("2019-11-04:00:00", "2019-11-10:00:00"); // Any date from monday to friday
    let schedule = res.scheduleItems;
    schedule = schedule.filter(i => i.startTime.split("T")[0] === day.toString());

    return schedule.map(i => ({
      id: i.scheduleItemID,
      title: i.title,
      input2: i.category,
      input3: i.startTime,
      input4: i.endTime,
      time: i.startTime.split("T")[1]
    }));
  };

  // Format date string
  formatDate = date => date.toString("yyyy-MM-ddTHH:mm");

  goForward = async () => {
    let today = new Date.today().setWeek(this.state.weekNumber);
    today.add(1).week();
    let startDate = new Date.today().setWeek(this.state.weekNumber);
    startDate.add(1).week();
    let endDate = new Date.today().setWeek(this.state.weekNumber);
    endDate
      .add(1)
      .week()
      .add(6)
      .day();
    let loopDate = new Date.today().setWeek(this.state.weekNumber);
    loopDate
      .add(1)
      .week()
      .add(-1)
      .day();

    this.setState({
      weekNumber: this.state.weekNumber + 1,
      year: today.getFullYear(),
      month: today.toString("MMMM"),
      startDate: startDate,
      endDate: endDate,
      loopDate: loopDate,
      wholeSchedule: await this.props.schedule(this.formatDate(startDate), this.formatDate(endDate))
    });
  };

  goBack = async () => {
    let today = new Date.today().setWeek(this.state.weekNumber);
    today.add(-1).week();
    let startDate = new Date.today().setWeek(this.state.weekNumber);
    startDate.add(-1).week();
    let endDate = new Date.today().setWeek(this.state.weekNumber);
    endDate
      .add(-1)
      .week()
      .add(6)
      .day();
    let loopDate = new Date.today().setWeek(this.state.weekNumber);
    loopDate
      .add(-1)
      .week()
      .add(-1)
      .day();

    this.setState({
      weekNumber: this.state.weekNumber - 1,
      year: today.getFullYear(),
      month: today.toString("MMMM"),
      startDate: startDate,
      endDate: endDate,
      loopDate: loopDate,
      wholeSchedule: await this.props.schedule(this.formatDate(startDate), this.formatDate(endDate))
    });
  };

  componentDidUpdate() {
    // Work around for days updating on click events
    this.state.loopDate.add(-7).day();
  }

  async componentDidMount() {
    let today = new Date(Date.today().setWeek(new Date.today().getWeek()));
    let startDate = new Date(Date.today().setWeek(new Date.today().getWeek()));
    let endDate = new Date(Date.today().setWeek(new Date.today().getWeek()));
    endDate.add(6).day();
    let loopDate = new Date(Date.today().setWeek(new Date.today().getWeek()));
    loopDate.add(-1).day();

    let data = (await this.props.schedule(this.formatDate(startDate), this.formatDate(endDate))) || {
      calendarItems: [],
      scheduleItems: [],
      tasks: []
    };

    this.setState({
      weekNumber: today.getWeek(),
      year: today.getFullYear(),
      month: today.toString("MMMM"),
      startDate: startDate,
      endDate: endDate,
      loopDate: loopDate,
      wholeSchedule: data
    });
  }

  render() {
    return (
      <div className="schedule-container">
        <div className="schedule-grid">
          {/* Grid heading */}
          <div className="schedule-header">
            <button onClick={this.goBack} className="left-icon">
              <img src={LeftIcon} alt="go left" />
            </button>
            <div className="schedule-title">
              <h2>
                Week {this.state.weekNumber}, {this.state.month} {this.state.year}
              </h2>
            </div>
            <button onClick={this.goForward} className="right-icon">
              <img src={RightIcon} alt="go right" />
            </button>
          </div>

          {/* Grid contents */}
          <div className="schedule-body">
            <div className="schedule-hours">
              <p className="empty-grid"></p>
              <p>00:00</p>
              <p>01:00</p>
              <p>02:00</p>
              <p>03:00</p>
              <p>04:00</p>
              <p>05:00</p>
              <p>06:00</p>
              <p>07:00</p>
              <p>08:00</p>
              <p>09:00</p>
              <p>10:00</p>
              <p>11:00</p>
              <p>12:00</p>
              <p>13:00</p>
              <p>14:00</p>
              <p>15:00</p>
              <p>16:00</p>
              <p>17:00</p>
              <p>18:00</p>
              <p>19:00</p>
              <p>20:00</p>
              <p>21:00</p>
              <p>22:00</p>
              <p>23:00</p>
              <p>00:00</p>
            </div>
            <div className="schedule-content">
              {[0, 1, 2, 3, 4, 5, 6].map((day, idx) => (
                <div key={idx} className="schedule-group" onClick={async () => {
                  let res = await this.formatData(day);
                  if (res.length === 0) this.props.addNewItem(null);
                  else this.props.openDay(res, this.days[day]);
                }}>
                  <div className="schedule-days">
                    {new Date.today().toDateString() ===
                    this.state.loopDate
                      .add(1)
                      .day()
                      .toDateString() ? (
                      <strong>{this.state.loopDate.toString("dddd dS")}</strong>
                    ) : (
                      this.state.loopDate.toString("dddd dS")
                    )}
                  </div>
                  <div className="schedule-items-view">
                    <div className="schedule-items">
                      {this.state.wholeSchedule.scheduleItems.map((data, idx) => {
                        let startTime = data.startTime.split("T")[1];
                        let startHours = startTime.split(":")[0];
                        let startMinutes = startTime.split(":")[1];

                        let endTime = data.endTime.split("T")[1];
                        let endHours = endTime.split(":")[0];
                        let endMinutes = endTime.split(":")[1];

                        let displayPosition = 20 + 50 * startHours + startMinutes * (5 / 6);
                        let displayHeight = (endHours - startHours) * 50 + (endMinutes - startMinutes) * (5 / 6);

                        return data.startTime.split("T")[0] === day.toString() ? (
                          <div key={idx} className="schedule-item" style={{ top: displayPosition + "px", height: displayHeight + "px" }}></div>
                        ) : null;
                      })}
                    </div>
                    <div className="calendar-items">
                      {this.state.wholeSchedule.calendarItems.map((data, idx) => {
                        let startDate = new Date(data.startTime);
                        let endDate = new Date(data.endTime);
                        let check =
                          (this.state.loopDate < endDate && this.state.loopDate > startDate) ||
                          (startDate.getFullYear() === this.state.loopDate.getFullYear() &&
                            startDate.getMonth() === this.state.loopDate.getMonth() &&
                            startDate.getDate() === this.state.loopDate.getDate()) ||
                          (endDate.getFullYear() === this.state.loopDate.getFullYear() &&
                            endDate.getMonth() === this.state.loopDate.getMonth() &&
                            endDate.getDate() === this.state.loopDate.getDate());

                        let hour = 0;
                        let minute = 0;
                        let displayHeight = 100;
                        if (
                          startDate.getFullYear() === this.state.loopDate.getFullYear() &&
                          startDate.getMonth() === this.state.loopDate.getMonth() &&
                          startDate.getDate() === this.state.loopDate.getDate()
                        ) {
                          if (
                            endDate.getFullYear() === this.state.loopDate.getFullYear() &&
                            endDate.getMonth() === this.state.loopDate.getMonth() &&
                            endDate.getDate() === this.state.loopDate.getDate()
                          ) {
                            hour = startDate.getHours();
                            minute = startDate.getMinutes();
                            displayHeight =
                              (endDate.getHours() - startDate.getHours()) * 50 + (endDate.getMinutes() - startDate.getMinutes()) * (5 / 6);
                          } else {
                            hour = startDate.getHours();
                            minute = startDate.getMinutes();
                            displayHeight = (24 - hour) * 50 - minute * (5 / 6);
                          }
                        } else if (
                          endDate.getFullYear() === this.state.loopDate.getFullYear() &&
                          endDate.getMonth() === this.state.loopDate.getMonth() &&
                          endDate.getDate() === this.state.loopDate.getDate()
                        ) {
                          displayHeight = endDate.getHours() * 50 + endDate.getMinutes() * (5 / 6);
                        } else {
                          displayHeight = 1200;
                        }

                        let displayPosition = 20 + 50 * hour + minute * (5 / 6);

                        return check ? (
                          <div key={idx} className="calendar-item" style={{ top: displayPosition + "px", height: displayHeight + "px" }}></div>
                        ) : null;
                      })}
                    </div>
                    <div className="tasks-items">
                      {this.state.wholeSchedule.tasks.map((data, idx) => {
                        let startDate = new Date(data.startTime);
                        let check =
                          startDate.getFullYear() === this.state.loopDate.getFullYear() &&
                          startDate.getMonth() === this.state.loopDate.getMonth() &&
                          startDate.getDate() === this.state.loopDate.getDate();

                        let displayPosition = 20 + 50 * startDate.getHours() + startDate.getMinutes() * (5 / 6);
                        let displayHeight = data.estimatedTime * (5 / 6);

                        return check ? (
                          <div key={idx} className="tasks-item" style={{ top: displayPosition + "px", height: displayHeight + "px" }}></div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Schedule;
