import { Injectable, InternalServerErrorException, HttpException, HttpService, HttpStatus, Inject, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from './database/db.service';
import { ClientGrpc } from "@nestjs/microservices"
import { SampleService } from './shared/interfaces/sample.interface';

@Injectable()
export class AppService implements OnModuleInit {

  sampleService: SampleService;
  constructor(
    private readonly dbService: DatabaseService,
    @Inject("SAMPLE_PACKAGE") private readonly grpcClient: ClientGrpc
  ) { }

  onModuleInit() {
    this.sampleService = this.grpcClient.getService<SampleService>("SampleService")
  }

  async getUsers() {
    try {
      const response = await this.dbService.db.getCollection('users').find().execute()
      return response.getDocuments()
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getSampleResponse() {
    await this.sampleService.sendRequest({
      message: "Hello World"
    })
  }

}
