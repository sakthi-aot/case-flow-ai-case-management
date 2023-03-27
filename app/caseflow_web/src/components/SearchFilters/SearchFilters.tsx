import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import "./SearchFilters.scss";

const SearchFilters = () => {
  // const [Value, setValue] = useState("");
  // const handleChange = (e) => {
  //     setValue(e.target.value);
  // }

  const filters = [
    { key: 1, text: "Tasks", values: ["Tasks 1", "Tasks 2", "Tasks 3"] },
    { key: 2, text: "Cases", values: ["Cases 1", "Cases 2", "Cases 3"] },
    {
      key: 3,
      text: "Documents",
      values: ["Documents 1", "Documents 2", "Documents 3"],
    },
    { key: 4, text: "Line of Business", values: ["LOB 1", "LOB 2", "LOB 3"] },
    {
      key: 5,
      text: "Assigned By",
      values: ["Assigned By 1", "Assigned By 2", "Assigned By 3"],
    },
    { key: 6, text: "Label", values: ["Label 1", "Label 2", "Label 3"] },
    { key: 7, text: "Date", values: ["Date 1", "Date 2", "Date 3"] },
  ];

  const getLogo = (index: Number) => {
    switch (index) {
      case 0:
        return (
          <img
            alt="Tasksicon"
            src={require("../../assets/TasksIcon.png")}
            style={{ height: "1rem", marginTop: ".1rem" }}
          ></img>
        );
      case 1:
        return (
          <img
            alt="Tasksicon"
            src={require("../../assets/CasesIcon.png")}
            style={{ height: "1rem", marginTop: ".1rem" }}
          ></img>
        );
      case 2:
        return (
          <img
            alt="Tasksicon"
            src={require("../../assets/DocumentsIcon.png")}
            style={{ height: "1rem", marginTop: ".1rem" }}
          ></img>
        );
      case 3:
        return (
          <img
            alt="Tasksicon"
            src={require("../../assets/LOBIcon.png")}
            style={{ height: "1rem", marginTop: ".1rem" }}
          ></img>
        );
      case 4:
        return (
          <img
            alt="Tasksicon"
            src={require("../../assets/AssignedIcon.png")}
            style={{ height: "1rem", marginTop: ".1rem" }}
          ></img>
        );
      case 5:
        return (
          <img
            alt="Tasksicon"
            src={require("../../assets/LabelIcon.png")}
            style={{ height: "1rem", marginTop: ".1rem" }}
          ></img>
        );
      case 6:
        return (
          <img
            alt="Tasksicon"
            src={require("../../assets/DateIcon.png")}
            style={{ height: "1rem", marginTop: ".1rem" }}
          ></img>
        );
      default:
        return (
          <img
            alt="Tasksicon"
            src={require("../../assets/TasksIcon.png")}
            style={{ height: "1rem" }}
          ></img>
        );
    }
  };

  return (
    <div style={{ "margin-left": "2rem" }}>
      <Typography variant="subtitle1">Filter By</Typography>
      {filters.map((item, index) => {
        return (
          <FormControl
            sx={{ mt: 2, minWidth: 250, border: 0 }}
            className="filters"
            size="small"
          >
            <InputLabel id="demo-simple-select-label" className="filter-text">
              {getLogo(index)}
              {item.text}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value=""
              label="Tasks"
              //onChange={handleChange}
            >
              {item.values.map((values) => {
                return <MenuItem value="Task 1">{values}</MenuItem>;
              })}
            </Select>
          </FormControl>
        );
      })}
    </div>
  );
};

export default SearchFilters;
