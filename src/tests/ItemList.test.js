import React from "react";
import ReactDOM from "react-dom";
import ItemList from "../components/ItemList.jsx";

const data = [
  {
    id: "1234",
    title: "Pick up Sarah from the airport",
    time: "12:00 - 13:00",
    input2: "test2",
    input3: "test3",
    input4: "3T00:00"
  }
];

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ItemList title="Test" items={data} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
