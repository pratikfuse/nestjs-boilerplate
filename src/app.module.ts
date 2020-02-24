import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EasyconfigModule } from "nestjs-easyconfig"
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-client.options';

@Module({
  imports: [
    EasyconfigModule.register({
      sampleFilePath: '.env.sample',
    }),
    DatabaseModule.register(
      {
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,
        port: 33060,
        schema: process.env.DB_SCHEMA,
        retry: 10000
      }
    ),
    AuthModule,
    SharedModule,
    // grpc clients module for microservice communication over grpc
    ClientsModule.register([
      {
        name: "SAMPLE_PACKAGE",
        ...grpcClientOptions
      }
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule { }
