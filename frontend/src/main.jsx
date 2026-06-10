import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import App from "./App";
import { store } from "./redux/store";

import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <Provider store={store}>
      <App />
    </Provider>
    <Toaster

        position="top-right"

        reverseOrder={false}

      />
  </React.StrictMode>
);