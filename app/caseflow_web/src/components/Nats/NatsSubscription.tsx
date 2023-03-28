import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Search from "../Search/Search";
import { connect } from "nats.ws";
import "./NatsSubscription.scss";

export interface natsPayload {
  eventId: string;
  eventRef: string;
  eventOrigin: string;
  eventCategory: string;
  eventType: string;
  eventDateTime: string;
  eventPublisher: string;
}

const NatsSubscribition = () => {
  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState<natsPayload | undefined>([]);
  const [connection, setConnection] = useState({
    clicked: false,
    connection: false,
  });
  const NATS_URL = "wss://caseflow-natserver.aot-technologies.com";

  const subscribeToMessages = async () => {
    try {
      const natsConnection = await connect({ servers: NATS_URL });
      subjects.map(async (subj) => {
        let sub = natsConnection.subscribe(subj);
        sub && sub.err == undefined
          ? setConnection({ clicked: true, connection: true })
          : setConnection({ clicked: true, connection: false });
        for await (const m of sub) {
          var msg = new TextDecoder().decode(m.data);
          setMessage((prev) => {
            let newMsg = JSON.parse(msg);
            return [...prev, newMsg];
          });
        }
      });
    } catch (err) {
      console.log(err);
      setConnection({ clicked: true, connection: false });
    }
  };

  const onNatsSubjectChangeHandler = (e) => {
    const index = subjects.indexOf(e.target.value);
    if (index === -1) {
      setSubjects((prev) => {
        return [...prev, e.target.value];
      });
    } else {
      setSubjects((prev) => {
        return prev.filter((sub) => sub !== e.target.value);
      });
    }
  };

  return (
    <section className="dashboard">
      <div className="header-search">
        <Typography variant="body1" className="title">
          CaseFlow
        </Typography>
        <div className="search">
          <Search
            setSearchField={() => {}}
            dropDownArray={[]}
            setSearchColumn={() => {}}
            dropDownValues={[]}
          ></Search>
        </div>
      </div>
      <div className="nats-subscription-container">
        <Typography
          sx={{ padding: "1rem 1rem 1rem 0rem" }}
          variant="h6"
          className="nats-heading"
        >
          Message Subscription Center
        </Typography>

        <Box sx={{ marginBottom: "1rem" }}>
          <FormControlLabel
            control={
              <Checkbox
                value="CaseCreate "
                onChange={onNatsSubjectChangeHandler}
              />
            }
            label="CaseCreate "
          />
          <FormControlLabel
            control={
              <Checkbox
                value="CaseUpdate "
                onChange={onNatsSubjectChangeHandler}
              />
            }
            label="CaseUpdate "
          />
          <FormControlLabel
            control={
              <Checkbox
                value="CaseOpen"
                onChange={onNatsSubjectChangeHandler}
              />
            }
            label="CaseOpen"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="CasePend"
                onChange={onNatsSubjectChangeHandler}
              />
            }
            label="CasePend"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="CaseComp"
                onChange={onNatsSubjectChangeHandler}
              />
            }
            label="CaseComp"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="DocAdded "
                onChange={onNatsSubjectChangeHandler}
              />
            }
            label="DocAdded "
          />
          <FormControlLabel
            control={
              <Checkbox
                value="DocDeleted "
                onChange={onNatsSubjectChangeHandler}
              />
            }
            label="DocDeleted "
          />
          <FormControlLabel
            control={
              <Checkbox
                value="workFlowStart "
                onChange={onNatsSubjectChangeHandler}
              />
            }
            label="workFlowStart "
          />

          <Button
            style={{
              alignItems: "center",
              marginTop: "1rem",
              height: "2.4375rem",
              width: "20%",
              // backgroundColor:'primary.main'
              backgroundColor: connection.clicked
                ? connection.connection
                  ? "green"
                  : "red"
                : "primary.main",
            }}
            variant="contained"
            type="submit"
            onClick={subscribeToMessages}
          >
            {connection.clicked
              ? connection.connection
                ? "Subscribed"
                : "Try again"
              : "Subscribe"}
          </Button>
        </Box>

        <Box>
          {message && message.length > 0 ? (
            message.map((msg) => {
              return (
                <Typography className="nats-messages">
                  <Typography>Event ID : {msg.eventId}</Typography>
                  <Typography>Event Ref : {msg.eventRef}</Typography>
                  <Typography>Event Origin : {msg.eventOrigin}</Typography>
                  <Typography>Event Category : {msg.eventCategory}</Typography>
                  <Typography>Event Type : {msg.eventType}</Typography>
                  <Typography>Event Date : {msg.eventDateTime}</Typography>
                  <Typography>
                    Event Publisher : {msg.eventPublisher}
                  </Typography>
                </Typography>
              );
            })
          ) : (
            <Typography variant="h6" className="nats-message">
              No Message{" "}
            </Typography>
          )}
        </Box>
      </div>
    </section>
  );
};

export default NatsSubscribition;
