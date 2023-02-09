import React from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { BreadCrumbsprops } from "../../interfaces/componentInterface";


const BreadCrumbs = ({dataForBreadCrumbs}:BreadCrumbsprops)=>{
    return(
        <Breadcrumbs  separator="›" aria-label="breadcrumb">
               {dataForBreadCrumbs.map((eachItem,index) => (
                <Link key={index} underline="hover" color="inherit" href={eachItem.link}>
                {eachItem.text}
              </Link>
        ))}
      </Breadcrumbs>
    )
}

export default BreadCrumbs;