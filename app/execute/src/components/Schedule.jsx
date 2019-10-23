// Libraries
import React from "react";

// Styles
import "../styles/Schedule.css";

// Icons
import LeftIcon from "../images/left-icon.svg";
import RightIcon from "../images/right-icon.svg";


class Schedule extends React.Component {
  state = {
    //currentPage : <h1>Calendar</h1> // The component
  };

  render() {
    return (
      <div className="schedule-container">
        <div className="schedule-grid">
          <div className="schedule-header">
            <button className="left-icon">
              <img src={LeftIcon} alt="go left" />
            </button>
            <div className="schedule-title">
              <h2>Week 6, Februrary 2019</h2>
            </div>
            <button className="right-icon">
              <img src={RightIcon} alt="go right" />
            </button>
          </div>
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
                <div className="schedule-days">Monday 12th</div>
                <div>M</div>
              </div>
              <div className="schedule-group schedule-tuesday">
                <div className="schedule-days">Tuesday 13th</div>
                <div>T</div>
              </div>
              <div className="schedule-group schedule-wednesday">
                <div className="schedule-days">Wednesday 14th</div>
                <div>W</div>
              </div>
              <div className="schedule-group schedule-thursday">
                <div className="schedule-days">Thursday 15th</div>
                <div>T</div>
              </div>
              <div className="schedule-group schedule-friday">
                <div className="schedule-days">Friday 16th</div>
                <div>F</div>
              </div>
              <div className="schedule-group schedule-saturday">
                <div className="schedule-days">Saturday 17th</div>
                <div>S</div>
              </div>
              <div className="schedule-group schedule-sunday">
                <div className="schedule-days">Sunday 18th</div>
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
