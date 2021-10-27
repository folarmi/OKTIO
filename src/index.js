import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { createTheme } from "@material-ui/core";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
// const BASE_URL = process.env.BASE_URL;
const theme = createTheme({
  palette: {
    primary: {
      main: "#2170ff",
      light: "#3c44b126",
      tbl_head_bg: "#f9f9f9",
      tbl_head: "#000000",
      warning: "#cc3300",
      green:"#def8f3",
      blue:"#e2f2ff",
      violet:"#bbc6e7",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#2270ff",
    },
  },
  typography: {
    fontFamily: ["Noto Sans", "sans-serif"].join(","),
  },

  overrides: {
    MuiTableCell: {
      root: {
        padding: "0",
      },
    },
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
      // .MuiToggleButton-root.Mui-selected

      MuiToggleButton: { root: { background: "#fff" } },
    },
    body: {
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      background:
        "linear-gradient(0deg, rgba(51,54,204,1) 0%, rgba(33,112,255,1) 100%)",
    },
    MuiCssBaseline: {
      "@global": {},
    },

    palette: {
      type: "dark",
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
);
