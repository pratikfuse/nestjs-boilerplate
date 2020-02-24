import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggerModule } from 'nestjs-pino';
import { LoggingInterceptor } from './logger.interceptor';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from 'src/grpc-client.options';

@Module({
    imports: [
        LoggerModule.forRoot({
            useExisting: true,
        })
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor
        }
    ]

})
export class SharedModule { }
