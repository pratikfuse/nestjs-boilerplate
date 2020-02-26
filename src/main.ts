import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.disable('x-powered-by');
  // swagger api documentation for all environments except prod
  if (process.env.NODE_ENV !== "prod") {
    const options = new DocumentBuilder()
      .setTitle("sample")
      .setDescription("Sample API Documentation")
      .setVersion('1.0')
      .addTag('sample')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
