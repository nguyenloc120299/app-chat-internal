import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "locale/i18n";
import { Provider } from "react-redux";
import store from "store";
import { DataProvider } from "context/globalSocket";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered successfully.");
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
} else {
  alert("Service Worker is not supported in this browser.");
}

root.render(
  <Provider store={store}>
    <DataProvider>
      <App />
    </DataProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
