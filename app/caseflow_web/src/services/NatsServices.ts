import { connect, NatsConnection,Msg   } from 'nats.ws';
const NATS_URL = ' ws://localhost:8080';

export const publishMessage = async (SUBJECT,MESSAGE) => {
    try {
      const message = new TextEncoder().encode(MESSAGE);
      const nc = await connect({ servers: NATS_URL });
      console.log('Connected to NATS server');
    //   const jsm = await nc.jetstream();
      
      nc.publish(SUBJECT, message);
      // nc.flush();
      // nc.close();
    //   console.log(jsm);
      console.log(nc);
      console.log('Message published successfully');
    } catch (error) {
      console.error(`Error publishing message: ${error}`);
    }
  }

export const subscribeToMessages = async (SUBJECT) => {
    try {
      const nc = await connect({ servers: NATS_URL });
      console.log('Connected to NATS server');
      const subscription = nc.subscribe(SUBJECT);
      console.log(subscription);
      for await (const msg of subscription) {
        console.log(`Received message: ${new TextDecoder().decode(msg.data)}`);
      }
    } catch (error) {
      console.error(`Error subscribing to messages: ${error}`);
    }
  };