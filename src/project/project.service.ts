import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import * as PROTO from 'src/common/proto/project-service/project.pb';
import * as DTO from 'src/project/dto/project.dto';
@Injectable()
export class ProjectService {
  private projectServiceClient: PROTO.ProjectServiceClient;

  @Inject(PROTO.PROJECT_PACKAGE_NAME)
  private readonly grpcClient: ClientGrpc;

  /**
   * This runs once when the module's instantiate the service.
   *
   * {@link https://docs.nestjs.com/fundamentals/lifecycle-events#lifecycle-events-1 Documentation}
   */
  public onModuleInit(): void {
    this.projectServiceClient = this.grpcClient.getService<PROTO.ProjectServiceClient>(PROTO.PROJECT_SERVICE_NAME);
  }

  async createProject(createProjectDto: DTO.CreateProjectDto): Promise<PROTO.ProjectCreateResponse> {
    return await firstValueFrom(this.projectServiceClient.create(createProjectDto));
  }
}
