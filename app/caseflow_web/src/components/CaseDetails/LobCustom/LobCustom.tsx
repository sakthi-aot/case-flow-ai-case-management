import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import React from 'react'
import LaunchIcon from '@mui/icons-material/Launch';
import "./LobCustom.scss";
import Link from '@mui/material/Link';
import { color } from '@mui/system';

const LobCustom = () => {
  return (
    <>
    <Typography variant='subtitle1' sx={{ margin: "3.5rem 0  1rem " }}>LOB Custom Content</Typography><Divider sx={{ borderBottomWidth:1,borderColor:'#9B9B9B' }} />
    <div className="lob-custom-content-case-detail">
          <div>
              <Typography variant='subtitle1'>
                  Case Category
              </Typography>
              <Typography variant='body2'
                  color='#606060'
              >
                  WildLife offense
              </Typography>
          </div>
          <div>
              <Typography variant='subtitle1'>
                  District
              </Typography>
              <Typography variant='body2'
                  color='#606060'
              >
                  thrissur
              </Typography>
          </div>

          <div>
              <Typography variant='subtitle1' className="lob-record-link-upper-section">

              </Typography>
              <Typography variant='body2' 
              >
                <Link href="#" underline="always" style={{color:"blue"}}>
                LOB Record <LaunchIcon  style={{ fontSize: '.875rem' }}/>
                </Link>
                
              </Typography>
          </div>
      </div>
      </>
  )
}

export default LobCustom