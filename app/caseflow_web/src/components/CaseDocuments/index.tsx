import React from "react";
import Typography from "@mui/material/Typography";
// import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
// import CaseDocumentCard from "../CaseDocumentCard";
import { useEffect, useState } from "react";
import Search from "../Search";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DownloadIcon from "@mui/icons-material/Download";
import "./CaseDocuments.scss";
import jpeg from "../../assets/jpeg.png";
import png from "../../assets/png.png";
import pdf from "../../assets/pdf.png";
import txt from "../../assets/txt.png";
import {useSelector,useDispatch} from "react-redux";
import Upload from "../Upload";
import EditIcon from '@mui/icons-material/Edit';
import { State, USerDetails } from "../../interfaces/stateInterface";
import { DocumentList } from "../../interfaces/componentInterface";
import { getAllDocuments,getDocument,searchCaseDocument } from "../../services/DocumentManagementService";
import { setDocumentList } from "../../reducers/documentsReducer";



const CaseDocuments = () => {
  const [filteredDocumentDetails, setFilteredDocumentDetails] = useState([]);
  const [documentDetailsForEdit, setDocumentDetailsForEdit] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [searchColumn, setSearchColumn] = useState("Name");
  const dropDownArray = ["Name","Description"];
   const dispatch = useDispatch();
  const getFileIcon = (fileName:any) => {
    let ext = fileName.split(".").pop();
    ext = ext.toLowerCase();
    switch (ext) {
      case "jpeg":
        return jpeg;
      case "pdf":
        return pdf;
      case "png":
        return png;
      case "txt":
        return txt;
    }
  };


  const filterDocumentDetails = async () => {
    let searchResult = await searchCaseDocument(searchField,searchColumn)
    // searchResult = searchResult.map((element) => {
      console.log(searchResult)

    // });
    if(searchResult)
    setFilteredDocumentDetails(searchResult)
  };



  useEffect(() => {
    fetchDocumentDetailsList()
    filterDocumentDetails();
  }, [searchField]);


  
  async function fetchDocumentDetailsList() {
    let output = await getAllDocuments();
    // output = output.map((element) => {
    //   return {
    //     ...element,
    //     creationdate: element.creationdate.split("T")[0],
    //     modificationdate: element.modificationdate.split("T")[0],
    //   };
    // });
    dispatch(setDocumentList(output));
  }

 const  fetchDocumentDetails=(data:any)=>{
setDocumentDetailsForEdit(data)
  }
  
  const previewDocument = async (id,type) => {
    let response = await getDocument(id)
    let newWindow = window.open('/')!
        newWindow.onload = () => {
          newWindow.location = window.URL.createObjectURL(
            new Blob([response["data"]], {type: type})
          );
        }

}


  return (
    <section className="dashboard">
      <h1 className="title">CaseFlow</h1>
      <div className="search">
        <Search
          setSearchField={setSearchField}
          dropDownArray={dropDownArray}
          setSearchColumn={setSearchColumn}
        ></Search>
      </div>
      <div className="recent-cases">
        {" "}
        <div className="background">
          <div className="file-card">
            <div>
              {/* <Upload selectedDMS = "dms1" documentDetailsForEdit={documentDetailsForEdit}  /> */}
              <div className="case-document-list">
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography
                      sx={{ padding: "1rem 1rem 1rem 1rem" }}
                      variant="h6"
                    >
                      Case Documents
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {/* <Search
            setSearchField={setSearchField}
            dropDownArray={dropDownArray}
            setSearchColumn={setSearchColumn}
          ></Search> */}
                  </Grid>
                </Grid>

                <Divider sx={{ borderBottomWidth: 3 }} />
                <TableContainer component={Paper}>
                 {(filteredDocumentDetails &&filteredDocumentDetails.length!==0)? <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow
                        sx={{
                          "& th": {
                            fontWeight: "bold",
                          },
                        }}
                      >
                        <TableCell>Id</TableCell>
                        <TableCell align="left">Case ID</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Creation Date</TableCell>
                        {/* <TableCell align="left">Last Modified Date </TableCell>
              <TableCell align="left">Download </TableCell> */}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredDocumentDetails &&
                        filteredDocumentDetails.map(
                          (documentDetail: DocumentList) => (
                            <TableRow
                              key={documentDetail.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {documentDetail.id}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {documentDetail.caseId}
                              </TableCell>
                              <TableCell align="left">
                                {" "}
                                <div className="name-field">
                                  <img
                                    className="pdf-file-img"
                                    src={`${getFileIcon(documentDetail.name)}`}
                                    alt="pdf"
                                  />
                                  <div className="case-document-name">
                                    <a
               onClick={()=>{
                previewDocument(documentDetail.id,documentDetail.type)
              }}
                                    >
                                      {documentDetail.name}
                                    </a>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell align="left">
                                {documentDetail.desc}
                              </TableCell>
                              <TableCell align="left">
                                {documentDetail.creationdate}
                              </TableCell>
                              <TableCell align="left">
                                {documentDetail.modificationdate}
                              </TableCell>
                              {/* <TableCell
                    align="left"
                    className="action-icon"
                    onClick={fetchCMISfile(
                      documentDetail.id,
                      documentDetail.dms_provider,false
                    )}
                  >
                    {<DownloadIcon />}
                  </TableCell>
                  <TableCell
                    align="left"
                    onClick={()=>{fetchDocumentDetails(documentDetail)}}
                  >
                    <span className="action-icon"> {<EditIcon />}</span>
                  </TableCell> */}
                            </TableRow>
                          )
                        )}
                    </TableBody>
                  </Table>:
                  <p className="no-case-doc-found">No Case Documents Found !</p>
                  }
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="my-task"><MyTask></MyTask></div> */}
    </section>
  );
};

export default CaseDocuments;
