import React from "react";
import { Provider } from "react-redux";
import BaseRouting from "./BaseRouting";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import NotFound from "./NotFound/NotFound";
import { AppProps } from "../interfaces/appInterface";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { Typography } from "@mui/material";



const App = React.memo(({ store }:AppProps ) => {
  
let theme = createTheme({
  palette: {
    primary: {
      main: "#404040",
    },
    secondary: {
      main: "#171616",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    body2:{
      fontWeight: 300,
    },
    body1:{
      fontWeight: 500,
    }
  },
})
theme = responsiveFontSizes(theme);

  return (
    <div>
      <Provider store={store}>
        <BrowserRouter >
        <ThemeProvider theme={theme}>
        <Typography>

          <React.Fragment>
            {/* <React.StrictMode> */}
            <Routes>
              <Route index path="/" element={<BaseRouting/>} />
              <Route
                index
                path="/private/*"
                element={<PrivateRoute store={store} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* </React.StrictMode> */}
          </React.Fragment>
          </Typography>
      </ThemeProvider>

        </BrowserRouter>
      </Provider>
    </div>
  );
});

export default App;
