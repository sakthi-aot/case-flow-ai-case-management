import { NestFactory } from '@nestjs/core';

import { Transport } from '@nestjs/microservices';

//_____________________Custom Imports_____________________//

import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({

    transport: Transport.TCP,

    options: {

      port: 7003,

    },

  });

  try {

    await app.startAllMicroservices();

    await app.listen(7002);

  } catch (err) {

    console.log(err);

  }

}

bootstrap();

