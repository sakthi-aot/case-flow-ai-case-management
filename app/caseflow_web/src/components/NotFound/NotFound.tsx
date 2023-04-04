import React from "react";
import { Link } from "react-router-dom";
import "./notfound.scss";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
const NotFound = () => {
  return (
    <div className="notfound">
      <section className="content-section">
        <div className="grid-container">
          <div className="grid-left">
            <img
              className="landingImage"
              alt="landingImage"
              src={require("../../assets/404.png")}
            ></img>
          </div>
          <div className="grid-right">
            <Box
              component="img"
              sx={{}}
              alt="Logo"
              src={require("../../assets/logo.png")}
            />
            <div className="inner_text">
              <Typography className="title">404</Typography>
              <Typography className="sub-title">Page Not Found</Typography>
              <Typography className="text">
                The page you requested could not be found
              </Typography>
              <div className="buttons">
                <Button
                  component={Link}
                  to="/"
                  style={{
                    color: "#404040",
                    border: "1px solid #404040",
                  }}
                  variant="outlined"
                >
                  <Typography variant="body1">Go Home</Typography>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <img
        className="bottom-blog"
        src="./components/Home/bottom.svg"
        alt="My Happy SVG"
      />
    </div>
  );
};

export default NotFound;
