import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ProjectService } from 'src/project/project.service';
import { ProjectController } from 'src/project/project.controller';
import { ConfigInterface } from 'src/config';
import makeMicroserviceUrl from 'src/common/helpers/microservice-url.helpers';
import * as PROTO from 'src/common/proto/project-service/project.pb';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: PROTO.PROJECT_PACKAGE_NAME,
        useFactory: (configService: ConfigService<ConfigInterface>) => ({
          transport: Transport.GRPC,
          options: {
            url: makeMicroserviceUrl(
              configService.get('AUTHENTICATION_HOST', { infer: true }),
              configService.get('AUTHENTICATION_PORT', { infer: true }),
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
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
