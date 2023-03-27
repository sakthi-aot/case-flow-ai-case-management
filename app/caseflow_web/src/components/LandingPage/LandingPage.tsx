import React from "react";
import { Link } from "react-router-dom";
import "./landingpage.scss";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
const LandingPage = () => {
  return (
    <div className="home">
      <section className="content-section">
        <div className="grid-container">
          <div className="grid-left">
            <Box
              component="img"
              sx={{}}
              alt="Logo"
              src={require("../../assets/logo.png")}
            />
            <div className="inner_text">
              <Typography
                variant="body1"
                sx={{ fontSize: "3rem", paddingBlock: "1rem" }}
              >
                An open-source generic Case Management application built on top
                of formsflow.ai
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "1rem", paddingBottom: "1rem" }}
              >
                caseflow.ai is a completely free and open-source framework
                explicitly designed to be highly generic and configurable that
                assesses, plans, implements, coordinates, monitors, and
                evaluates to improve outcomes, experiences, and value. An
                open-source generic Case Management application built on top of
                formsflow.ai
              </Typography>
              <div className="buttons">
                <Button
                  component={Link}
                  to="/private/"
                  className="landing-page-getStarted-btn"
                  variant="contained"
                >
                  <Typography variant="body1">Get Started</Typography>
                </Button>

                <Button
                  component={Link}
                  to="/private/"
                  className="landing-page-explore-more-btn"
                  variant="outlined"
                >
                  <Typography variant="body1">Explore More</Typography>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid-right">
            <img
              alt="landing page"
              className="landingImage"
              src="./components/Home/landingImage.jpeg"
            ></img>
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

export default LandingPage;
