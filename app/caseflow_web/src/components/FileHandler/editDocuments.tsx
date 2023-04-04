import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import "./fileHandler.scss";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { updateCMISdocument } from "../../apiManager/services/cmisService";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import FileViewer from "react-file-viewer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setDocumentList } from "../../reducers/documentsReducer";
import { getAllDocuments } from "../../services/DocumentManagementService";
import { useSelector, useDispatch } from "react-redux";

const EditDocuments = (props) => {
  const params = useParams();
  const documents = useSelector((state) => state.documents.documentsList);
  console.warn(documents);
  const existingDocuments = documents.filter((doc) => doc.id == params.id);
  const {
    dms_provider,
    content,
    description,
    docname,
    name,
    documentid,
    downloadurl,
  } = existingDocuments[0];
  const [values, setValues] = useState({
    dms: dms_provider,
    content: content,
    fileName: docname,
    fileDescription: description,
  });

  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [actionSelected, setActionSelected] = useState("upload");
  const [documentID, setDocumentID] = useState(1);
  const [previewURL, setPreviewURL] = useState();
  const [filetypeUploaded, setfileTypeUploaded] = useState(null);
  useEffect(() => {
    fetchDocumentDetails();
  }, []);

  async function fetchDocumentDetails() {
    let output = await getAllDocuments();
    output = output.map((element) => {
      return {
        ...element,
        creationdate: element.creationdate.split("T")[0],
        modificationdate: element.modificationdate.split("T")[0],
      };
    });
    dispatch(setDocumentList(output));
  }

  function handleUpload(event) {
    const uploadedDoc = event.target.files[0];
    setfileTypeUploaded(uploadedDoc.type.split("/")[1]);
    const objectURl = URL.createObjectURL(uploadedDoc);

    setPreviewURL(objectURl);
    setFile(uploadedDoc);
    setFileName(uploadedDoc.name);
  }
  function fileNameChange(event) {
    setFileName(event.target.value);
  }

  const onSubmitHandler = async () => {
    const dms = "DMS1";
    updateCMISdocument(documentID, file, fileName, fileDescription, dms);
  };

  const onDescriptionchange = (event) => {
    event.target.value == null
      ? setFileDescription("My text document description...")
      : setFileDescription(event.target.value);
  };
  const onIDchange = (event) => {
    event.target.value == null
      ? setDocumentID(1)
      : setDocumentID(parseInt(event.target.value));
  };

  return (
    <div className="background">
      <div className="file-card">
        <div className="accordion">
          <Typography variant="h5">Update Documents</Typography>

          <div className="DMS-selector">
            <Box sx={{ minWidth: 120, backgroundColor: "white" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">DMS</InputLabel>

                <TextField
                  autoComplete="id"
                  name="id"
                  variant="outlined"
                  required
                  id="id"
                  label="DMS"
                  autoFocus
                  value={values.dms}
                  disabled
                />
                <img
                  className="pdf-file-img"
                  src={`data:image/jpeg;base64,${values.content}`}
                  alt="pdf"
                />
              </FormControl>
            </Box>
          </div>
          <div className="upload-grid">
            <div className="upload-left">
              <div className="upload-row">
                <input
                  type="file"
                  id="actual-btn"
                  onChange={handleUpload}
                  hidden
                />
                <Button className="choose-file-btn-upload" variant="contained">
                  <label
                    htmlFor="actual-btn"
                    className="choose-file-btn-label-upload"
                  >
                    {file === "" ? "Choose File" : "replace file"}
                  </label>
                </Button>
                <TextField
                  sx={{
                    "& .MuiInputLabel-root": { color: "#404040" },
                    borderBottom: "1px solid #404040",
                  }}
                  InputProps={{ disableUnderline: true }}
                  label="File Name"
                  variant="standard"
                  className="file-name-text-field-upload"
                  value={values.fileName}
                  onChange={fileNameChange}
                  placeholder="File Name..."
                />
              </div>
              <div
                style={{
                  paddingTop: "1rem",
                  width: "100%",
                }}
              >
                {values.fileName !== "" && (
                  <div
                    style={{
                      paddingTop: "1rem",
                      width: "100%",
                    }}
                  >
                    <TextField
                      id="outlined-multiline-static"
                      label="Description"
                      multiline
                      rows={4}
                      variant="standard"
                      sx={{
                        "& .MuiInputLabel-root": { color: "#404040" },
                        borderBottom: "1px solid #404040",
                        width: "100%",
                      }}
                      InputProps={{ disableUnderline: true }}
                      value={values.fileDescription}
                      onChange={onDescriptionchange}
                      placeholder="My text document description..."
                    />
                  </div>
                )}
              </div>

              <div className="upload-button">
                <Button
                  style={{
                    margin: "auto",
                    height: "3.4375rem",
                    width: "100%",
                  }}
                  variant="outlined"
                  onClick={onSubmitHandler}
                >
                  Update file
                </Button>
              </div>
            </div>

            <div className="upload-right">
              {previewURL && filetypeUploaded !== "plain" && (
                <div className="display-upload-result">
                  <FileViewer
                    key={Math.random()}
                    fileType={filetypeUploaded}
                    filePath={previewURL}
                  ></FileViewer>
                </div>
              )}
            </div>
            {/* </div> */}
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default EditDocuments;
