import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



export default function CustomizedDialog(props) {

  const {title,children,isOpen, setIsOpen,handleClose} = props;
 
  return (
    <Dialog open={isOpen}  onClose={(e)=>handleClose(e)} fullWidth  >
      <DialogTitle>{title}<IconButton
          aria-label="close"
          onClick={()=> handleClose() }
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton></DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      </Dialog>)

  }