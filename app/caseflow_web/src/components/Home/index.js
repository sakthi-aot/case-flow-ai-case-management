import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
const Home = () => {
  return (
    <div className="welcome">
      <h1>WELCOME TO CASEFLOW</h1>
      <h2>
        <Link className="link" to="private/upload">
          UPLOAD FILE
        </Link>
      </h2>
      <h2>
        <Link className="link" to="private/download">
          DOWNLOAD FILE
        </Link>
      </h2>
    </div>
  );
};

export default Home;
