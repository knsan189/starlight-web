import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "./redux/store/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
