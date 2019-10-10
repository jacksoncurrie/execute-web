import React from "react";

class ItemList extends React.Component {
  state = {
    //currentPage : <h1>Calendar</h1> // The component
  };

  render() {
    return (
      <div className="outerPopupWrapper">
        <div className="innerPopoutContainer">
          <div className="popup-header">
            <div className="left-popup-group">
              <button onClick={this.props.addItem}>
                <img src="#" className="add-icon" alt="add icon" />
              </button>
            </div>
            <div className="center-popup-group">
              <h3>{this.props.title}</h3>
            </div>
            <div className="right-popup-group">
              <button onClick={this.props.close}>
                <img src="#" className="App-logo" alt="close icon" />
              </button>
            </div>
          </div>
          <div className="popup-content">
            {this.props.items.map((item, idx) => (
              <div key={idx} id={item.id} onClick={this.props.openItem}>
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
