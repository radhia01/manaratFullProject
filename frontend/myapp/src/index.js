import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import {persistor, store } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import  setup from "./axios/setup"
setup();
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <I18nextProvider i18n={i18n}>
        {" "}
        <App />
      </I18nextProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);
