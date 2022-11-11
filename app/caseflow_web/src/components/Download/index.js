import React, { useState } from "react";
import { fetchCMISfile } from "../../apiManager/services/cmisService";
import "./download.css";

const Download = () => {
  const [value, setValue] = useState("");

  return (
    <div className="download">
      {" "}
      <input
        value={value}
        placeholder="Enter document Id"
        onChange={(evt) => setValue(evt.target.value)}
        className="text"
        type="text"
      ></input>
      <button onClick={fetchCMISfile(value)}>Download</button>
    </div>
  );
};

export default Download;
