import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm } from "react-hook-form";
import { fetchCaseTypess } from "../../services/constantsService";
import { setCaseTypes } from "../../reducers/constantsReducer";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../interfaces/stateInterface";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { updateCaseType } from "../../services/CaseService";
import { toast, ToastContainer } from "react-toastify";



const Configurations = () => {
  const dispatch = useDispatch();

  const getCaseTypes = async () => {
    const result = await fetchCaseTypess();
    dispatch(setCaseTypes(result));
  };
  const caseTypes = useSelector((state: State) => state.constants.caseTypes);

  useEffect(() => {
    getCaseTypes().then((data) => {});
  }, []);
  const [isEdit, setIsEdit] = useState<
    {
      id: number;
      displayname:string
      isEdit: boolean;
      formid: string;
      searchTerm:string;
      defaultFormid: string;
      defaultSearchTerm:string;
    }[]
  >([]);

  useEffect(() => {
    if (isEdit.length ==0) {
      setIsEdit(setEditArray());
    }
  }, [caseTypes]);

  const setEditArray = () => {
    return caseTypes.map((element) => {
      return {
        id: element.id,
        isEdit: false,
        formid: element.formid,
        searchTerm: element.searchterm,
        displayname: element.displayname,
        defaultFormid: element.formid,
        defaultSearchTerm: element.searchterm,
      };
    });
  };

  const onEdit = (id) => {
    let newArr = [...isEdit];
    var foundIndex = newArr.findIndex((x) => x.id == id);
    newArr[foundIndex].isEdit = true;

    setIsEdit(newArr);
  };
  const onClose = (id) => {

      let newArr = [...isEdit];
    console.log(newArr)

      var foundIndex = newArr.findIndex((x) => x.id == id);
      newArr[foundIndex].isEdit = false;
      newArr[foundIndex].formid = newArr[foundIndex].defaultFormid ;
      newArr[foundIndex].searchTerm = newArr[foundIndex].defaultSearchTerm ;
      setIsEdit(newArr);
  };
  const getEdit = (id) => {
    if (isEdit.length > 0) {
      var foundIndex = isEdit.findIndex((x) => x.id == id);
      return isEdit[foundIndex].isEdit;
    } else return false;
  };
  const getTextValue = (id) => {
    if (isEdit.length > 0) {
      var foundIndex = isEdit.findIndex((x) => x.id == id);
      return isEdit[foundIndex].formid;
    } else return "";
  };

  const onSubmit = (id: number) => {
    const caseType = caseTypes.filter((x) => x.id === id)[0];
    const formId = isEdit.filter((x) => x.id === id)[0].formid;
    const searchTerm = isEdit.filter((x) => x.id === id)[0].searchTerm;
    updateCaseType({ ...caseType, formid: formId,searchterm: searchTerm })
      .then((data) => {
        if (data && data?.success) {
          toast.success("Updated CaseType Successfully");
          getCaseTypes().then((data) => {});
          let newArr = [...isEdit];
          var foundIndex = newArr.findIndex((x) => x.id == id);
          newArr[foundIndex].isEdit = false;
        } else {
          toast.error("Error updating the Type");
        }
      })
      .catch(() => {
        toast.error("Error updating the Type");
      });
  };
  const onFormIdChange = (formid: string, id: number) => {
    let temp = [...isEdit]
    let foundIndex = temp.findIndex((x) => x.id === id);
    temp[foundIndex].formid = formid; 
    setIsEdit(temp)
  };
  const onSearchTermChange = (searchTerm: string, id: number) => {
    let temp = [...isEdit]
    var foundIndex = isEdit.findIndex((x) => x.id === id);
    temp[foundIndex].searchTerm = searchTerm; 
    setIsEdit(temp)
  };

  return (
    <Box sx={{ mx: 20, mt: 20 }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Configurations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListItem sx={{ paddingInline: 0, paddingBlock: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      className="recent-case-card-style"
                    >
                      Id
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      className="recent-case-card-style"
                    >
                      Name
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      className="recent-case-card-style"
                    >
                      form Id
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      className="recent-case-card-style"
                    >
                      Search Term
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      className="recent-case-card-style"
                    ></Typography>
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider sx={{ border: 1, borderColor: "#606060" }} />

          {isEdit?.map((option, index) => (
            <>
              <ListItem key={index} sx={{ paddingInline: 0, paddingBlock: 2 }}>
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          className="recent-case-card-style"
                        >
                          {option.id}
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          className="recent-case-card-style"
                        >
                          {option.displayname}
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          className="recent-case-card-style"
                        >
                          <TextField
                            sx={{ width: "10rem" }}
                            id="standard-basic"
                            variant="standard"
                            disabled={!getEdit(option.id)}
                            value = {option.formid}
                            onChange={(e) =>
                              onFormIdChange(e.target.value, option.id)
                            }
                          />
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={3  }>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          className="recent-case-card-style"
                        >
                          <TextField
                            sx={{ width: "10rem" }}
                            id="standard-basic"
                            variant="standard"
                            disabled={!getEdit(option.id)}
                            value={option.searchTerm}
                            onChange={(e) =>
                              onSearchTermChange(e.target.value, option.id)
                            }
                          />
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          className="recent-case-card-style"
                        >
                          {!getEdit(option.id) ? (
                            <IconButton onClick={() => onEdit(option.id)}>
                              <EditIcon />
                            </IconButton>
                          ) : (
                            <>
                              <IconButton onClick={() => onClose(option.id)}>
                                <CloseIcon />
                              </IconButton>{" "}
                              <IconButton onClick={() => onSubmit(option.id)}>
                                <DoneIcon />
                              </IconButton>
                            </>
                          )}
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </>
          ))}
        </AccordionDetails>
      </Accordion>
      <ToastContainer />
    </Box>
  );
};

export default Configurations;
