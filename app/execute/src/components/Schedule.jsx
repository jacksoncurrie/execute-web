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
    loopDate.add(1).week().add(-1).day();

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
    loopDate.add(-1).week().add(-1).day();

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

  async componentDidMount() {
    let today = new Date.today().setWeek(new Date.today().getWeek());
    let startDate = new Date.today().setWeek(new Date.today().getWeek());
    let endDate = new Date.today().setWeek(new Date.today().getWeek());
    endDate.add(6).day();
    let loopDate = new Date.today().setWeek(new Date.today().getWeek());
    loopDate.add(-1).day();

    this.setState({
      weekNumber: today.getWeek(),
      year: today.getFullYear(),
      month: today.toString("MMMM"),
      startDate: startDate,
      endDate: endDate,
      loopDate: loopDate,
      wholeSchedule: await this.props.schedule(this.formatDate(startDate), this.formatDate(endDate))
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
                <div key={idx} className="schedule-group">
                  <div onClick={() => this.props.openDay(null, null)} className="schedule-days">
                    {new Date.today().toDateString() === this.state.loopDate.add(1).day().toDateString() ? (
                      <strong>{this.state.loopDate.toString("dddd dS")}</strong>
                    ) : (
                      this.state.loopDate.toString("dddd dS")
                    )}
                  </div>
                  <div className="schedule-items-view">
                    <div className="schedule-items">
                      {this.state.wholeSchedule.scheduleItems.map((data, idx) => (
                        data.startTime.split("T")[0] === day.toString() ? (
                          <div key={idx} className="schedule-item">
                            S
                          </div>
                        ) : null
                      ))}
                    </div>
                    <div className="calendar-items">
                      {this.state.wholeSchedule.calendarItems.map((data, idx) => {
                        let startDate = new Date(data.startTime);
                        let endDate = new Date(data.endTime);
                        let check = (this.state.loopDate < endDate && this.state.loopDate > startDate) || 
                          ((startDate.getFullYear() === this.state.loopDate.getFullYear()) && 
                            (startDate.getMonth() === this.state.loopDate.getMonth()) &&
                            (startDate.getDate() === this.state.loopDate.getDate())) ||
                          ((endDate.getFullYear() === this.state.loopDate.getFullYear()) &&
                            (endDate.getMonth() === this.state.loopDate.getMonth()) &&
                            (endDate.getDate() === this.state.loopDate.getDate()))
                        return check ? (
                          <div key={idx} className="calendar-item">
                            C
                          </div>
                        ) : null;
                      })}
                    </div>
                    <div className="tasks-items">
                      {this.state.wholeSchedule.tasks.map((data, idx) => {
                         let startDate = new Date(data.startTime);
                         let check = ((startDate.getFullYear() === this.state.loopDate.getFullYear()) && 
                            (startDate.getMonth() === this.state.loopDate.getMonth()) &&
                            (startDate.getDate() === this.state.loopDate.getDate()))
                         return check ? (
                           <div key={idx} className="tasks-item">
                             T
                           </div>
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
