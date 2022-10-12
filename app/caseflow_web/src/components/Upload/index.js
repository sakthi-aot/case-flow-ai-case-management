import React from "react";
import {
  fetchCMISfile,
  uploadCMISfile,
} from "../../apiManager/services/cmisService";
import "./index.css";

//this component is used  to upload files into cmis
//contains a drag and drop input box and a name textfield to rename the file if necessary
//if textbox is not altered the defult filename will be used.

const Upload = () => {
  const [file, setFile] = React.useState("");
  const [fileName, setFileName] = React.useState("");

  function handleUpload(event) {
    setFile(event.target.files[0]); //set file into state
    setFileName(event.target.files[0].name); //set the filename after importing new file
  }
  function fileNameChange(event) {
    setFileName(event.target.value); //set the filename from text box if name is alterded
  }

  return (
    <div id="upload-box">
      <div className="form">
        <input className="input" type="file" onChange={handleUpload} /> /
        {file.name ? (
          <p>{file.name}</p>
        ) : (
          <p>Drag your files here or click in this area.</p>
        )}
        {file.name ? (
          <input
            value={fileName}
            placeholder="Change the name..."
            type="text"
            className="text"
            onChange={fileNameChange}
          />
        ) : (
          <div></div>
        )}
        <button onClick={uploadCMISfile(file, fileName)}>Upload</button>
      </div>

      <div></div>
    </div>
  );
};

export default Upload;
