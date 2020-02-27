import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import logger from './shared/utils/logger';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger
    });
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
      SwaggerModule.setup('api-docs', app, document);
    }
    await app.listen(process.env.PORT || 3000);
  } catch (error) {
    
  }

 
}
bootstrap();
