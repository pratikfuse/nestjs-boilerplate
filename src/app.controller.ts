import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from './auth/permissions.decorator';
import { PermissionsGuard } from './auth/permissions.guard';
import { SampleService } from './shared/interfaces/sample.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get("public")
  getData() {
    return {
      message: "This is a public route"
    }
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get("items")
  @Permissions('read:posts', 'write:posts')
  async getUsers() {
    const users = await this.appService.getUsers();
    return {
      message: "This is a protected route",
      users
    }

  }
}
