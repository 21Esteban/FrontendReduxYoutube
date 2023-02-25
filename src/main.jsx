import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// styles
import "./index.css";
import "animate.css";
import "react-modal-video/scss/modal-video.scss";
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import axios from "axios";

axios.defaults.baseURL = "https://backendreduxyoutube.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
