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

const App = React.memo(({ store }: AppProps) => {
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
      h5: {
        fontWeight: 500,
      },
      body2: {
        fontWeight: 400,
        color: "#606060",
        margin: "0rem 0 0rem 0",
      },
      body1: {
        fontWeight: 500,
      },
      subtitle1: {
        fontWeight: 700,
        margin: "1rem 0 0rem 0",
      },
      caption: {
        color: "#606060",
      },
    },
  });
  theme = responsiveFontSizes(theme);

  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Typography>
              <React.Fragment>
                <Routes>
                  <Route index path="/" element={<BaseRouting />} />
                  <Route
                    index
                    path="/private/*"
                    element={<PrivateRoute store={store} />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </React.Fragment>
            </Typography>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
});

export default App;
