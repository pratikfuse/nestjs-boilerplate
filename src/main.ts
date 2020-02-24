import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await app.listen(process.env.PORT || 3000);
  app.enableCors()
  app.disable('x-powered-by')
  const url = await app.getUrl()
  console.info(`Server listening on ${url}`)
}
bootstrap();
