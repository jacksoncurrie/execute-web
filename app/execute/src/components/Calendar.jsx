// Libraries
import React from "react";

class Calendar extends React.Component {
  state = {
    daysGrid: <div></div>
  };

  getDaysGrid = () => {
    return (
      <div>
        <div className="row1">
          <div className="empty"></div>
          <div className="day1">1</div>
          <div className="day2">2</div>
          <div className="day3">3</div>
          <div className="day4">4</div>
          <div className="day5">5</div>
          <div className="day6">6</div>
        </div>
        <div className="row2">
          <div className="day7">7</div>
          <div className="day8">8</div>
          <div className="day9">9</div>
          <div className="day10">10</div>
          <div className="day11">11</div>
          <div className="day12">12</div>
          <div className="day13">13</div>
        </div>
        <div className="row3">
          <div className="day14">14</div>
          <div className="day15">15</div>
          <div className="day16">16</div>
          <div className="day17">17</div>
          <div className="day18">18</div>
          <div className="day19">19</div>
          <div className="day20">20</div>
        </div>
        <div className="row4">
          <div className="day21">21</div>
          <div className="day22">22</div>
          <div className="day23">23</div>
          <div className="day24">24</div>
          <div className="day25">25</div>
          <div className="day26">26</div>
          <div className="day27">27</div>
        </div>
        <div className="row5">
          <div className="day28">28</div>
          <div className="day29">29</div>
          <div className="day30">30</div>
          <div className="day31">31</div>
          <div className="empty"></div>
          <div className="empty"></div>
          <div className="empty"></div>
        </div>
        <div className="row6">
          <div className="empty"></div>
          <div className="empty"></div>
          <div className="empty"></div>
          <div className="empty"></div>
          <div className="empty"></div>
          <div className="empty"></div>
          <div className="empty"></div>
        </div>
      </div>
    );
  };

  componentDidMount() {
    // When app starts load day grid
    this.setState({
      daysGrid: this.getDaysGrid()
    });
  }

  render() {
    return (
      <div>
        <h1>Calendar</h1>
        <div className="calendar">
          <div className="calendarHeading">
            <button onClick={this.props.goBack}>
              <img src="#" className="back-icon" alt="back icon" />
            </button>
            <h2>{this.props.date}</h2>
            <button onClick={this.props.goForward}>
              <img src="#" className="forward-icon" alt="forward icon" />
            </button>
          </div>
          <div className="calendarGrid">
            <div className="calendarWeeks">
              <div className="week">Monday</div>
              <div className="week">Tuesday</div>
              <div className="week">Wednesday</div>
              <div className="week">Thursday</div>
              <div className="week">Friday</div>
              <div className="week">Saturday</div>
              <div className="week">Sunday</div>
            </div>
            <div className="calendarDays">{this.state.daysGrid}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
