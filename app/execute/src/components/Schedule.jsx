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
    weekdays: []
  };

  // Check if day is today to make bold
  getWorkDayItem = today =>
    Date.today().toDateString() === today.toDateString() ? <strong>{today.toString("dddd dS")}</strong> : today.toString("dddd dS");

    // Set the weeks days
  setWorkdays = today => [
    this.getWorkDayItem(today),
    this.getWorkDayItem(today.add(1).day()),
    this.getWorkDayItem(today.add(1).day()),
    this.getWorkDayItem(today.add(1).day()),
    this.getWorkDayItem(today.add(1).day()),
    this.getWorkDayItem(today.add(1).day()),
    this.getWorkDayItem(today.add(1).day())
  ];

  goForward = () => {
    let today = Date.today().setWeek(this.state.weekNumber);
    today.add(1).week();
    this.setState({
      weekNumber: today.getWeek(),
      year: today.getFullYear(),
      month: today.toString("MMMM"),
      weekdays: this.setWorkdays(today)
    });
  };

  goBack = () => {
    let today = Date.today().setWeek(this.state.weekNumber);
    today.add(-1).week();
    this.setState({
      weekNumber: today.getWeek(),
      year: today.getFullYear(),
      month: today.toString("MMMM"),
      weekdays: this.setWorkdays(today)
    });
  };

  componentDidMount() {
    let today = Date.today().setWeek(Date.today().getWeek());
    this.setState({
      weekNumber: today.getWeek(),
      year: today.getFullYear(),
      month: today.toString("MMMM"),
      weekdays: this.setWorkdays(today)
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
              <div className="schedule-group schedule-monday">
                <div onClick={() => this.props.openDay(null, null)} className="schedule-days">
                  {this.state.weekdays[0]}
                </div>
                <div>M</div>
              </div>
              <div className="schedule-group schedule-tuesday">
                <div onClick={() => this.props.openDay(null, null)} className="schedule-days">
                  {this.state.weekdays[1]}
                </div>
                <div>T</div>
              </div>
              <div className="schedule-group schedule-wednesday">
                <div onClick={() => this.props.openDay(null, null)} className="schedule-days">
                  {this.state.weekdays[2]}
                </div>
                <div>W</div>
              </div>
              <div className="schedule-group schedule-thursday">
                <div onClick={() => this.props.openDay(null, null)} className="schedule-days">
                  {this.state.weekdays[3]}
                </div>
                <div>T</div>
              </div>
              <div className="schedule-group schedule-friday">
                <div onClick={() => this.props.openDay(null, null)} className="schedule-days">
                  {this.state.weekdays[4]}
                </div>
                <div>F</div>
              </div>
              <div className="schedule-group schedule-saturday">
                <div onClick={() => this.props.openDay(null, null)} className="schedule-days">
                  {this.state.weekdays[5]}
                </div>
                <div>S</div>
              </div>
              <div className="schedule-group schedule-sunday">
                <div onClick={() => this.props.openDay(null, null)} className="schedule-days">
                  {this.state.weekdays[6]}
                </div>
                <div>S</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Schedule;
