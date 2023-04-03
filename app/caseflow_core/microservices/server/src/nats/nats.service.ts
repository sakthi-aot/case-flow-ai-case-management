import { BadRequestException, Injectable } from '@nestjs/common';
import { PublishNatDto } from './dto/publish-nat.dto';
import { WebSocketServer } from '@nestjs/websockets';
// const NATS_URL = "wss://caseflow-natserver.aot-technologies.com";
const NATS_URL = 'nats://localhost:4222';
import { Server } from 'ws';
import { connect } from 'nats';

@Injectable()
export class NatsService {
  @WebSocketServer() server: Server;

  publishMessage = async (publishNatDto: PublishNatDto) => {
    try {
      const MESSAGE = JSON.stringify(publishNatDto.message);
      const message = new TextEncoder().encode(MESSAGE);
      const nc = await connect({ servers: NATS_URL, timeout: 5000 });
      console.log('Connected to NATS server');
      console.log(publishNatDto.subject);
      nc.publish(publishNatDto.subject, message);

      console.log(nc);
      console.log('Message published to NATS successfully');

      // Broadcast message to WebSocket clients

      console.log('Message broadcast to WebSocket clients successfully');
      return;
    } catch (error) {
      console.error(`Error publishing message: ${error}`);
      throw new BadRequestException(`Error publishing message: ${error}`);
    }
  };
}
