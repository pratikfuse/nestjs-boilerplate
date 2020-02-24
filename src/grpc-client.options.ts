import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'sample',
    protoPath: join(__dirname, '..', './proto_files/sample.proto')
  },
};
