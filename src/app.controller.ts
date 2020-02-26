import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from './auth/permissions.decorator';
import { PermissionsGuard } from './auth/permissions.guard';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get("public")
  getData() {
    return {
      message: "This is a public route"
    };
  }
  // auth guard to check jwt token and user permissions
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get("posts")
  @Permissions('read:posts')
  async getUsers() {
    const users = await this.appService.getUsers();
    return {
      message: "This is a protected route",
      users
    };
  }
}
