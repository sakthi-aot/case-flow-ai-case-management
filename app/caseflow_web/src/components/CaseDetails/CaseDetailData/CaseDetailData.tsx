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
  name: String;
  date: any;
  owner: String;
  caseDescription: String;
  tasks: any;
  caseType: any;
  lobCaseId: number;
}

const CaseDetailData = ({
  name,
  date,
  owner,
  caseDescription,
  tasks,
  caseType,
  lobCaseId,
}: CaseDetailDataProps) => {
  return (
    <>
      <div className="case-details">
        <div className="case-detail-name">
          <Typography variant="subtitle1">{GENERIC_NAME} name</Typography>
          <Typography variant="body2">{name}</Typography>
        </div>
        <div className="case-detail-date">
          <Typography variant="subtitle1">Start Date</Typography>

          <Typography variant="body2">
            {moment(date).format("YYYY-MM-DD")}
          </Typography>
        </div>
        <div className="case-detail-owner">
          <Typography variant="subtitle1">Owner</Typography>
          <Typography variant="body2">{owner}</Typography>
        </div>
        <div>
          <Typography variant="subtitle1">
            {GENERIC_NAME} Description
          </Typography>
          <Typography variant="body2">{caseDescription}</Typography>
        </div>
        <div>
          <Typography variant="subtitle1">{GENERIC_NAME} Type</Typography>
          <Typography variant="body2">{caseType?.displayname}</Typography>
        </div>
        <div>
          <Typography variant="subtitle1">LOB ID</Typography>

          <Typography variant="body2">{lobCaseId}</Typography>
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
