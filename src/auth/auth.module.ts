import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigInterface } from 'src/config';
import { AuthController } from './controllers/auth.controller';
import { UserManagementController } from './controllers/user-management.controller';

import { AuthService } from './auth.service';
import * as PROTO from 'src/common/proto/authentication-service/auth.pb';
import makeMicroserviceUrl from 'src/common/helpers/microservice-url.helpers';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: PROTO.AUTH_PACKAGE_NAME,
        useFactory: (configService: ConfigService<ConfigInterface>) => ({
          transport: Transport.GRPC,
          options: {
            url: makeMicroserviceUrl(
              configService.get('PROJECT_HOST', { infer: true }),
              configService.get('PROJECT_PORT', { infer: true }),
            ),
            package: PROTO.AUTH_PACKAGE_NAME,
            protoPath: join('node_modules', 'proto', 'proto-files', 'authentication-service', 'auth.proto'),
          },
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ]),
  ],
  controllers: [AuthController, UserManagementController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
