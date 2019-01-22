import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import FinstagramApp from "./FinstagramApp";

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <HashRouter>
        <FinstagramApp />
      </HashRouter>
    </Provider>
  )
}

export default Root;