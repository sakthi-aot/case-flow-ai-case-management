import React from "react";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./LandingPage";

const BaseRouting = React.memo(({ store }) => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
});

export default BaseRouting;
