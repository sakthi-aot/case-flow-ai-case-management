import { NestFactory } from '@nestjs/core';

//_____________________Custom Imports_____________________//
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
