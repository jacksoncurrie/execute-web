// Libraries
import React from "react";

// Images
import AddIcon from "../images/add-icon.svg";
import CloseIcon from "../images/close-icon.svg";

class ItemList extends React.Component {
  state = {
    //currentPage : <h1>Calendar</h1> // The component
  };

  render() {
    return (
      <div className="outer-popup-wrapper">
        <div className="inner-popout-container">
          <div className="popup-header">
            <div className="left-popup-group">
              <button onClick={this.props.addItem}>
                <img src={AddIcon} className="add-icon" alt="add icon" />
              </button>
            </div>
            <div className="center-popup-group">
              <h3>{this.props.title}</h3>
            </div>
            <div className="right-popup-group">
              <button onClick={this.props.close}>
                <img src={CloseIcon} className="App-logo" alt="close icon" />
              </button>
            </div>
          </div>
          <div className="popup-form item-list">
            {this.props.items.map((item, idx) => (
              <div className="list-item" key={idx} id={item.id} onClick={this.props.openItem}>
                <strong>{item.title}</strong>
                <span>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ItemList;
