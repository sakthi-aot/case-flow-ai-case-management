import React from "react";
import { Link } from 'react-router-dom'
import "./home.css";
import Button from "@mui/material/Button";

const Home = () => {
  return (
    <div className="welcome">
      <div className="content-section">
        <div className="grid-container">
          <div class="grid-left">
            <div class="inner_text">
              <h1 className = "title" >
                An  open-source generic Case Managment application built on top of formsflow.ai
              </h1>
              <p className= "text">
                caseflow.ai is a completely free and open source
                framework explicitly designed to be hightly generic and configurable that assesses, plans, implements, coordinates, monitors, and evaluates to improve outcomes, experiences, and value.
              </p>
              <div class="buttons">
                <Button
                component={Link} to="/private/files"
                  style={{
                    backgroundColor: "#1B34FB",
                  }}
                  variant="contained"
                >
                  Manage files
                </Button>

                <Button 
                 component={Link} to=""style={{
                    color: "#1B34FB",
                  }}
                  variant="outlined">learn more</Button>
              </div>
            </div>
          </div>
          

          <div class="grid-right">
            <img className="landingImage" src="./components/Home/landingImage.jpeg"></img>
          </div>
        </div>
      </div>
      <img className = "bottom-blog"src = "./components/Home/bottom.svg" alt="My Happy SVG"/>
      

    </div>
  );
};

export default Home;
