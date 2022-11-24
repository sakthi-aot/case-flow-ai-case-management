import React from "react";
import Typography from "@mui/material/Typography";
// import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
// import CaseDocumentCard from "../CaseDocumentCard";
import { getAllDocuments } from "../../services/DocumentManagementService";
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
import { fetchCMISfile } from "../../apiManager/services/cmisService";
import "./CaseDocuments.scss";
import jpeg from "../../assets/jpeg.png";
import png from "../../assets/png.png";
import pdf from "../../assets/pdf.png";
import txt from "../../assets/txt.png";
import {useSelector} from "react-redux";
import { setDocumentList } from "../../reducers/documentsReducer";
const CaseDocuments = () => {
  const [filteredDocumentDetails, setFilteredDocumentDetails] = useState([]);
  const [documentDetails, setDocumentDetails] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchColumn, setSearchColumn] = useState("Name");
  const dropDownArray = ["Name", "Id", "Creation Date", "modification Date"];
   const documents =  useSelector(state=>state.documents.documentsList);
  const getFileIcon = (fileName) => {
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


  const filterDocumentDetails = () => {
    switch (searchColumn) {
      case "Name":
        return setFilteredDocumentDetails(
          documentDetails.filter((eachValue) => {
            return eachValue.name
              .toLowerCase()
              .includes(searchField.toLowerCase());
          })
        );
      case "Id":
        return setFilteredDocumentDetails(
          documentDetails.filter((eachValue) => {
            return eachValue.id
              .toString()
              .toLowerCase()
              .includes(searchField.toLowerCase());
          })
        );
      case "Creation Date":
        return setFilteredDocumentDetails(
          documentDetails.filter((eachValue) => {
            return eachValue.creationdate
              .toString()
              .toLowerCase()
              .includes(searchField.toLowerCase());
          })
        );
      case "modification Date":
        return setFilteredDocumentDetails(
          documentDetails.filter((eachValue) => {
            return eachValue.modificationdate
              .toString()
              .toLowerCase()
              .includes(searchField.toLowerCase());
          })
        );
      default:
        return setFilteredDocumentDetails(
          documentDetails.filter((eachValue) => {
            return eachValue.name
              .toLowerCase()
              .includes(searchField.toLowerCase());
          })
        );
    }
  };

  useEffect(() => {
    // fetchDocumentDetails();
    setDocumentDetails(documents);
     setFilteredDocumentDetails(documents);
  }, [documents]);

  useEffect(() => {
    filterDocumentDetails();
  }, [searchField]);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography sx={{ padding: "1rem 1rem 1rem 1rem" }} variant="h6">
            Case Documents 
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Search
            setSearchField={setSearchField}
            dropDownArray={dropDownArray}
            setSearchColumn={setSearchColumn}
          ></Search>
        </Grid>
      </Grid>

      <Divider sx={{ borderBottomWidth: 3 }} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  fontWeight: "bold",
                },
              }}
            >
              <TableCell>Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Creation Date</TableCell>
              <TableCell align="left">Last Modified Date </TableCell>
              <TableCell align="left">Download </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredDocumentDetails &&
              filteredDocumentDetails.map((documentDetail) => (
                <TableRow
                  key={documentDetail.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {documentDetail.id}
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
                        {documentDetail.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    {documentDetail.description}
                  </TableCell>
                  <TableCell align="left">
                    {documentDetail.creationdate}
                  </TableCell>
                  <TableCell align="left">
                    {documentDetail.modificationdate}
                  </TableCell>
                  <TableCell
                    align="left"
                    className="download-icon"
                    onClick={fetchCMISfile(
                      documentDetail.id,
                      documentDetail.dms_provider
                    )}
                  >
                    {<DownloadIcon />}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-label="mailbox folders"
      >
        {filteredDocumentDetails &&
          filteredDocumentDetails.map((documentDetail) => (
            <CaseDocumentCard
              name={documentDetail.name}
              size={documentDetail.contentsize}
              creationDate={documentDetail.creationdate}
              lastUpdated={documentDetail.modificationdate}
              id={documentDetail.id}
              dms_provider={documentDetail.dms_provider}
              key={documentDetail.id}
            />
          ))}
      </List> */}
    </div>
  );
};

export default CaseDocuments;
