import React, { useState } from "react";
import { fetchCMISfile } from "../../apiManager/services/cmisService";
import "./download.css";
import MiniDrawer from "../NavigationDrawer"

const Download = () => {
  const [value, setValue] = useState("");

  return (
    
    <div className="download">
      <MiniDrawer></MiniDrawer>
      {" "}
      <input
        value={value}
        placeholder="Enter document Id"
        onChange={(evt) => setValue(evt.target.value)}
        className="text-area"
        type="text"
      ></input>
      <button className = "button"onClick={fetchCMISfile(value)}>Download</button>
    </div>
  );
};

export default Download;
