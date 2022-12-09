import React from 'react'
import "./CaseDetailReference.scss"
import lob from "../../DynamicConfig/standard-case-fields.json"
import { filledInputClasses } from '@mui/material';

const CaseDetailReference = ({docketNum,courtRef}) => {
  let data = {
    
   "lob1" : [{
    id : "1",
    "docketnumber" : "1234",
    "courtreference" : "2022-11-21"
  },
  {
    id : "1",
    "docketnumber" : "1234",
    "courtreference" : "2022-11-21"
  }]};



  const formatData = (data,lobs) =>{

    lobs.config.map(lob => {
      let keys_to_keep = lob.fields.map(field => field.key)
      keys_to_keep.push("id")
      if (data.hasOwnProperty(lob.key)) {
        data[lob.key] =  data[lob.key].map(o => keys_to_keep.reduce((acc, curr) => {
          acc[curr] = o[curr];
          return acc;
        }, {}));
      }

    })

    console.log(data);

  }
  data = formatData(data,lob)


  
  return (
    <>
      <div className="case-detail-reference-first-row">
      {data.map((item) => {
        
        
      })}
      </div>
      <div className="configurable-case-content-section">
        Configurable case content
      </div>
    </>
  );
}

export default CaseDetailReference
