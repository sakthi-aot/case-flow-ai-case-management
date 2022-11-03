import React, { useRef, useState } from "react";
import {
  uploadCMISfile,
  updateCMISdocument
} from "../../apiManager/services/cmisService";
import "./index.css";
import MiniDrawer from "../NavigationDrawer"
//this component is used  to upload files into cmis
//contains a drag and drop input box and a name textfield to rename the file if necessary
//if textbox is not altered the defult filename will be used.

const Upload = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [actionSelected,setActionSelected] = useState("upload")


  const documentIDRef = useRef(""); 

  function handleUpload(event) {
    setFile(event.target.files[0]); //set file into state
    setFileName(event.target.files[0].name); //set the filename after importing new file
  }
  function fileNameChange(event) {
    setFileName(event.target.value); //set the filename from text box if name is alterded
  }

  const onActionSelectChange = (event ) =>{    
    setActionSelected(event.target.value)
  }
  const onSubmitHandler = ( ) =>{
    if(actionSelected ==="upload"){
      uploadCMISfile(file,fileName)
    }
    
    if(actionSelected==="edit"){
      updateCMISdocument(documentIDRef.current.value,file,fileName)
    }
  }

  return (
      <>
  <MiniDrawer></MiniDrawer>
      <div className="dropdown-selection">
        <h2>CHOOSE YOUR ACTION</h2>
          <select className="actions-select" onChange={onActionSelectChange} >            
            <option value="upload" className="action-option">Upload</option>
            <option value="edit" className="action-option">Edit/Update</option>
          </select>
      </div>
      
     <div id="upload-box">
      <div className="form">
        <input className="input" type="file" onChange={handleUpload} /> /
        {file.name ? (
          <p>{file.name}</p>
        ) : (
          <p>Drag your files here or click in this area.</p>
        )}
        {file.name && (
          <input
            value={fileName}
            placeholder="Change the name..."
            type="text"
            className="file-input"
            onChange={fileNameChange}
          />
        ) }
        <br/>
        { actionSelected ==="edit" && <input
            
            placeholder="Enter the ID"
            type="text"
            className="file-input"
            ref={documentIDRef}
          />}
        <button className="upload-btn" onClick={onSubmitHandler}>Upload</button>
      </div>

      <div></div>
    </div>


      </>



  );
};

export default Upload;
