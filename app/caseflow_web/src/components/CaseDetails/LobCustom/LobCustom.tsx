import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import React, { useEffect } from 'react'
import LaunchIcon from '@mui/icons-material/Launch';
import "./LobCustom.scss";
import Link from '@mui/material/Link';
import { color } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../interfaces/stateInterface';
import { getLobDetails } from '../../../services/LOBService';
import { setSelectedCaseLOBDetails } from '../../../reducers/newCaseReducer';
import { useNavigate } from 'react-router';


const LobCustom = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedCase = useSelector((state:State) => state.cases.selectedCase);
    const lobData = selectedCase.lobDetails;
    useEffect( () => {
        if(selectedCase.lobcaseid > 0){
    
        getCaseLobDetails(selectedCase.lobcaseid)
        // lobData = selectedCase.lobDetails;
              
      }
    }, [selectedCase.lobcaseid]);
    const getCaseLobDetails = async (id) =>{
        let lobDetails = await getLobDetails(id);
        if(lobDetails && lobDetails.id){
          dispatch(setSelectedCaseLOBDetails(lobDetails))
        }
      }

    const navigateToLob = () =>{
        navigate("/private/lob/" + lobData.id+'/details');
    }
    
  return (
    <>
    <Typography variant='body1' sx={{ margin: "3.5rem 0  1rem ", fontSize: 24 }}>LOB Custom Content</Typography><Divider sx={{ border:1,color:'#606060' }} />
   { lobData && lobData.id ? <div className="lob-custom-content-case-detail">
          <div>
              <Typography variant='subtitle1'>
                  Policy Number
              </Typography>
              <Typography variant='body2'
                  color='#606060'
              >
                  {lobData.policyNumber}
              </Typography>
          </div>
          <div>
              <Typography variant='subtitle1'>
                  Sum Assured
              </Typography>
              <Typography variant='body2'
                  color='#606060'
              >
                   {lobData.sumAssured}
              </Typography>
          </div>

          <div>
              <Typography variant='subtitle1' className="lob-record-link-upper-section">

              </Typography>
              <Typography variant='body2' 
              >
                <Link onClick={navigateToLob} underline="always" style={{color:"blue",cursor:"pointer"}}>
                LOB Record <LaunchIcon  style={{ fontSize: '.875rem' }}/>
                </Link>
                
              </Typography>
          </div>
      </div> :   <Typography variant='body2'
                  color='#606060'
                  className="no-details-found"
              >
               No Details Found !
              </Typography>}
      </>
  )
}

export default LobCustom


