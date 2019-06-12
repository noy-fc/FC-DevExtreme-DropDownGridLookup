import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import App from "./App";

function Main() {
  return <App />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
