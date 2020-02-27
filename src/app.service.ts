import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() { }

  async getUsers() {
    return {
      users: ["User1", "User2"]
    }
  }
}
