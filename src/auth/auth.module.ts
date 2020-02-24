import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        })
    ],
    providers: [JwtStrategy],
    exports: [PassportModule, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule { }
