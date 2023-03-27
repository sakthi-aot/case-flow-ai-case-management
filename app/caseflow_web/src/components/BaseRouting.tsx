import React from "react";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./LandingPage/LandingPage";

const BaseRouting = React.memo(() => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
});

export default BaseRouting;
