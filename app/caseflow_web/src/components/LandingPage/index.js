import React from "react";
import { Link } from "react-router-dom";
import "./landingpage.scss";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
const LandingPage = () => {
  return (
    <div className="home">
      <div className="content-section">
        <div className="grid-container">
          <div className="grid-left">
            <Box
              component="img"
              sx={{}}
              alt="Logo"
              src={require("../../assets/logo.png")}
            />
            <div className="inner_text">
              <h1 className="title">
                An open-source generic Case Managment application built on top
                of formsflow.ai
              </h1>
              <p className="text">
                caseflow.ai is a completely free and open source framework
                explicitly designed to be hightly generic and configurable that
                assesses, plans, implements, coordinates, monitors, and
                evaluates to improve outcomes, experiences, and value.
              </p>
              <div className="buttons">
                <Button
                  component={Link}
                  to="/private/"
                  className="landing-page-getStarted-btn"
                  variant="contained"
                >
                  Get Started
                </Button>

                <Button
                  component={Link}
                  to="/private/"
                  className="landing-page-explore-more-btn"
                  variant="outlined"
                >
                  Explore More
                </Button>
              </div>
            </div>
          </div>

          <div className="grid-right">
            <img alt="landing page"
              className="landingImage"
              src="./components/Home/landingImage.jpeg"
            ></img>
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

export default LandingPage;
