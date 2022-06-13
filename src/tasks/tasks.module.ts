import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigInterface } from 'src/config';
import makeMicroserviceUrl from 'src/common/helpers/microservice-url.helpers';
import * as PROTO from 'src/common/proto/project-service/project.pb';
import { join } from 'path';

import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: PROTO.PROJECT_PACKAGE_NAME,
        useFactory: (configService: ConfigService<ConfigInterface>) => ({
          transport: Transport.GRPC,
          options: {
            url: makeMicroserviceUrl(
              configService.get('PROJECT_HOST', { infer: true }),
              configService.get('PROJECT_PORT', { infer: true }),
            ),
            package: PROTO.PROJECT_PACKAGE_NAME,
            protoPath: join('node_modules', 'proto', 'proto-files', 'project-service', 'project.proto'),
          },
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule { }
