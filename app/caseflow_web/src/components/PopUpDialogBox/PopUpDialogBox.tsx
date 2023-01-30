import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import "./PopUpDialogBox.scss"

const PopUpDialogBox = (props) =>{

     return  <Dialog className='popup'
       open={props.isOpen}
     onClose={props.onClose}
     aria-labelledby="alert-dialog-title"
     aria-describedby="alert-dialog-description"
   >     
     <DialogContent>
       <DialogContentText id="alert-dialog-description">
       {props.dialogContentText}
       </DialogContentText>
     </DialogContent>
    { props.type == "delete" ?<DialogActions className={props.type=="delete"?"dialogActionCenter":""}>
       <Button onClick={props.onClose} className="btn1Style">{props.btn1}</Button>
       <Button onClick={props.onConfirm} autoFocus className="btn2Style" variant="contained">
         {props.btn2}
       </Button>
     </DialogActions> : ""}
     { props.type == "confirm" ?<DialogActions className='confirm'>
       <Button onClick={props.onClose} className="secondary">{props.btn1}</Button>
       <Button onClick={props.onConfirm} autoFocus className="primary" variant="contained">
         {props.btn2}
       </Button>
     </DialogActions> : ""}
   </Dialog>


}

export default PopUpDialogBox
