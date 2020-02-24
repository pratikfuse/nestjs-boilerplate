import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Get()
    getAuth(): any{
        return {
            message: "HEllo"
        }
    }
}
