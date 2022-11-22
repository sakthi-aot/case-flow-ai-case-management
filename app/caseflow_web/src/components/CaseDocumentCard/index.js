import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import "./CaseDocumentCard.scss";
import { fetchCMISfile } from "../../apiManager/services/cmisService";
import jpeg from "../../assets/jpeg.png"
import png from "../../assets/png.png"
import pdf from "../../assets/pdf.png"
import txt from "../../assets/txt.png"
const CaseDocumentCard = ({
  id,
  name,
  size,
  creationDate,
  lastUpdated,
  version,
  dms_provider,
}) => {
  // const caseDate = date.toJSON().slice(0,10).replace(/-/g,'/')
  const getFileIcon= (fileName) =>{
    let ext = fileName.split('.').pop();
    ext = ext.toLowerCase()
    switch(ext){
      case "jpeg":
        return jpeg;
      case "pdf":
        return pdf;
      case "png":
        return png ;
      case "txt":
        return txt;
    
    }
    
    
    }
  return (
    <div>
      <Typography />
      <ListItem button>
        <Grid container spacing={1}>
          <Grid item xs={1}>
            <ListItemText
              primary={
                <Typography variant="body2" style={{ fontWeight: "700" }}>
                  Id
                </Typography>
              }
              secondary={id}
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <div>
                  <Typography variant="body2" style={{ fontWeight: "700" }}>
                    Name
                  </Typography>
                </div>
              }
              secondary={
                <div className="name-field">
                  <img
                    className="pdf-file-img"
                    src={`${getFileIcon(name)}`}
                    alt="pdf"
                  />
                  <div className="case-document-name">{name}</div>
                </div>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography variant="body2" style={{ fontWeight: "700" }}>
                  Size
                </Typography>
              }
              secondary={size}
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography variant="body2" style={{ fontWeight: "700" }}>
                  Creation Date
                </Typography>
              }
              secondary={creationDate}
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography variant="body2" style={{ fontWeight: "700" }}>
                  Last Updated
                </Typography>
              }
              secondary={lastUpdated}
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography variant="body2" style={{ fontWeight: "700" }}>
                  Version#
                </Typography>
              }
              secondary={version}
            />
          </Grid>
          <div onClick={fetchCMISfile(id, dms_provider)}>
            <Grid item xs={1}>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "700" }}
                  ></Typography>
                }
                secondary={<DownloadIcon />}
              />
            </Grid>
          </div>
        </Grid>
      </ListItem>
      <Divider />
    </div>
  );
};

export default CaseDocumentCard;
