import { Link, Typography } from "@mui/material";
import React from "react";
import "./CaseDetailData.scss";
import {
  FORMSFLOW_APP_URL,
  FORMSFLOW_WEB_URL,
  GENERIC_NAME,
} from "../../../apiManager/endpoints/config";
import moment from "moment";
interface CaseDetailDataProps {
  contactName: String;
  individual: String;
  startDate: any;
  owner: String;
  caseDescription: String;
  tasks: any;
  dueDate: any;
  city: String;
  province: String;
  additionalInfo: String;
}

const CaseDetailData = ({
  contactName,
  individual,
  startDate,
  owner,
  caseDescription,
  tasks,
  dueDate,
  city,
  province,
  additionalInfo,
}: CaseDetailDataProps) => {
  return (
    <>
      <div className="case-details">
        <div className="case-detail-name">
          <Typography variant="subtitle1">Contact name</Typography>
          <Typography variant="body2">{contactName}</Typography>
        </div>
        <div className="case-detail-name">
          <Typography variant="subtitle1">Individual</Typography>
          <Typography variant="body2">{individual}</Typography>
        </div>
        <div className="case-detail-date">
          <Typography variant="subtitle1">Start Date</Typography>

          <Typography variant="body2">
            {moment(startDate).format("YYYY-MM-DD")}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">
              {GENERIC_NAME} Description
            </Typography>
          <Typography variant="body2">{caseDescription}</Typography>
        </div>
        <div className="case-detail-owner">
          <Typography variant="subtitle1">Owner</Typography>
          <Typography variant="body2">{owner}</Typography>
        </div>
        <div className="case-detail-date">
        <Typography variant="subtitle1">Due Date</Typography>

        <Typography variant="body2">
          {moment(dueDate).format("YYYY-MM-DD")}
        </Typography>
        </div>
        <div className="case-detail-city">
          <Typography variant="subtitle1">City</Typography>
          <Typography variant="body2">{city}</Typography>
        </div>
        <div className="case-detail-province">
          <Typography variant="subtitle1">Province</Typography>
          <Typography variant="body2">{province}</Typography>
        </div>
        <div>
          <Typography variant="subtitle1">
              Additional Information
            </Typography>
          <Typography variant="body2">{additionalInfo}</Typography>
        </div>
      </div>

      <div className="case-tasks">
        <Typography variant="subtitle1">
          Current Task{tasks?.length > 1 ? "s" : ""}
        </Typography>
        {tasks && tasks.length ? (
          tasks.map((task: any, index: any) => (
            <Link target="_blank" href={FORMSFLOW_WEB_URL + `/task/${task.id}`}>
              {" "}
              <Typography variant="body2" key={index}>
                {task.name}
              </Typography>
            </Link>
          ))
        ) : (
          <Typography variant="body2" style={{ "padding-bottom": "1rem" }}>
            No Tasks
          </Typography>
        )}
      </div>
    </>
  );
};

export default CaseDetailData;
