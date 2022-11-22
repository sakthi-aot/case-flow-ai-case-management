import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import CaseDocumentCard from "../CaseDocumentCard";
import { getAllDocuments } from "../../services/DocumentManagementService";
import { useEffect, useState } from "react";
import Search from "../Search";
import Grid from "@mui/material/Grid";


const CaseDocuments = () => {
  async function fetchDocumentDetails() {
    let output = await getAllDocuments();
    console.log(output);
    return setDocumentDetails(output);
  }

  const [documentDetails, setDocumentDetails] = useState([]);

  useEffect(() => {
    fetchDocumentDetails();
  }, []);

  return (
    <div>
      <Grid container spacing={1}>
          <Grid item xs={6}>
          <Typography sx={{ padding: "1rem 1rem 1rem 1rem" }} variant="h6">
        Case Documents
      </Typography>
          </Grid>
          <Grid item xs={6}>
      <Search documentDetails = {documentDetails}></Search>

          </Grid>
          </Grid>

     
      <Divider sx={{ borderBottomWidth: 3 }} />

      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-label="mailbox folders"
      >
        {documentDetails &&
          documentDetails.map((documentDetail) => (
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
      </List>
    </div>
  );
};

export default CaseDocuments;
