import React from "react";
import { Link } from "react-router-dom";
import "./notfound.scss";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
const NotFound = () => {
  return (
    <div className="notfound">
      <div className="content-section">
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
              <h1 className="title">404</h1>
              <h2 className="sub-title">Page Not Found</h2>
              <p className="text">The page you requested could not be found</p>
              <div className="buttons">
                <Button
                  component={Link}
                  to="/"
                  style={{
                    color: "#404040",
                    border:"1px solid #404040"
                  }}
                  variant="outlined"
                >
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="bottom-blog"
        src="./components/Home/bottom.svg"
        alt="My Happy SVG"
      />
    </div>
  );
};

export default NotFound;
