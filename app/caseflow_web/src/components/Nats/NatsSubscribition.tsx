import { Button, Checkbox,  FormControlLabel, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, {  useState } from 'react'
import Search from '../Search/Search'
import { connect,StringCodec   } from 'nats.ws';

import "./NatsSubscribition.scss"
import { async } from 'q';

export interface natsPayload{
  eventId:number,
  eventRef:string,
  eventOrigin:string,
  eventCategory:string,
  eventType:string,
  eventDateTime:Date,
  eventPublisher:string

}

const NatsSubscribition = () => {

    const [subjects,setSubjects] = useState([]);  
    const [message, setMessage] = useState< natsPayload | undefined >(undefined);

    const NATS_URL = ' ws://localhost:8080';
    const SUBJECT = 'Pending';
    const NSUBJECT = 'Open';
    const sc = StringCodec();



(async () => {

  const natsConnection = await connect({ servers: NATS_URL });
  let sub =  natsConnection.subscribe(SUBJECT);      
  for await (const m of sub) {
    var msg = new TextDecoder().decode(m.data);
    // console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
    // let msg = sc.decode(m.data);
    console.log(msg);
    
    // console.log(typeof msg)
   
  }
  console.log("subscription closed");
})();

const subscribeToMessages = async( ) =>{
  try{
    const natsConnection = await connect({ servers: NATS_URL }); 
    console.log("subscrip")
    subjects.map(async(subj)=>{
      console.log("sub",subj)
      let sub = natsConnection.subscribe(subj);
      for await (const m of sub) {
        var msg = new TextDecoder().decode(m.data);
        // console.log(JSON.stringify(JSON.parse (msg)))
        console.log(JSON.parse (msg))
      }
    })

  }catch(err){
    console.log(err)
  }
}

// (async () => {

//   const natsConnection = await connect({ servers: NATS_URL });
//   let sub =  natsConnection.subscribe(NSUBJECT);      
//   for await (const m of sub) {
//     console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
//     let msg = sc.decode(m.data);
//     console.log(msg);
//     console.log(typeof msg)
//     setMessage((prev)=>{
//       return[...prev,msg]
//     })
//   }
//   console.log("subscription closed");
// })();

 const onNatsSubjectChangeHandler = (e) =>{
    const index = subjects.indexOf(e.target.value)
    console.log(e.target.value)
    console.log(index)
    if(index === -1){
        setSubjects((prev)=>{
            return [...prev,e.target.value]
        })
    }else{
        setSubjects((prev)=>{
            return prev.filter(sub=>sub !== e.target.value)
        })
    }
 } 

// let natsMessage;
// message && message.length>0 ? 
// message.forEach(msg=>natsMessage = <Typography variant='h6'>{msg}</Typography>) :natsMessage = <Typography variant='h6'>No msg</Typography>

  return (
    <section className="dashboard">
    <div className="header-search">
    <Typography variant="body1" className="title">CaseFlow</Typography>
    <div className="search">
      <Search
       setSearchField={()=>{}}
       dropDownArray={[]}
       setSearchColumn={()=>{}}
       dropDownValues = {[]}
      ></Search>
    </div>
    </div>  
      <div className="nats-subscribition-container">
      <Typography
        sx={{ padding: "1rem 1rem 1rem 0rem" }}
        variant="h6"
        className="nats-heading"
      >
       Nats Subscribition Center
    </Typography>

    <Box >      
        <FormControlLabel control={<Checkbox value='CaseStart' onChange={onNatsSubjectChangeHandler} />} label="CaseStart" />
        <FormControlLabel control={<Checkbox value='CasePend' onChange={onNatsSubjectChangeHandler}  />} label="CasePend" />
        <FormControlLabel control={<Checkbox value='DocAdded ' onChange={onNatsSubjectChangeHandler}  />} label="DocAdded " />    
     
        <Button
            style={{
              alignItems :"center",
              // margin: "auto",
              height: "2.4375rem",
              width: "20%",
              backgroundColor:'primary.main'            
            }}
            variant="contained"
            type="submit"  
            onClick={subscribeToMessages}        
          >
            Submit
          </Button>  
 
    </Box>

    <Box>     
      {message && message.length>0 ? message.map(msg=>{
        return  <Typography  className='nats-messages'>
          <Typography variant='h5'>Event ID : {msg.eventId}</Typography>
          <Typography variant='h5'>Event Ref : {msg.eventRef}</Typography>
          <Typography variant='h5'>Event Origin : {msg.eventOrigin}</Typography>
          <Typography variant='h5'>Event Category : {msg.eventCategory}</Typography>
          <Typography variant='h5'>Event Type : {msg.eventType}</Typography>
          <Typography variant='h5'>Event Date : {msg.eventDateTime}</Typography>
          <Typography variant='h5'>Event Publisher : {msg.eventPublisher}</Typography>
          
        </Typography>
      }):
      <Typography variant='h6' className='nats-message' >No message Yt</Typography>
    }
     
    
    </Box>



      </div>
    
  </section>
  )
}

export default NatsSubscribition