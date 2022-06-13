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

  async findAllProjects(findAllProjectsDto: DTO.FindAllProjectsDto): Promise<PROTO.ProjectFindAllResponse> {
    return await firstValueFrom(this.projectServiceClient.findAll(findAllProjectsDto));
  }

  async findProject(findProjectDto: DTO.FindProjectDto): Promise<PROTO.ProjectFindOneResponse> {
    return await firstValueFrom(this.projectServiceClient.findOne(findProjectDto));
  }

  async removeProject(removeProjectDto: DTO.RemoveProjectDto): Promise<PROTO.ProjectRemoveResponse> {
    return await firstValueFrom(this.projectServiceClient.remove(removeProjectDto));
  }

  async activateProject(activateProjectDto: DTO.ProjectStatusDto): Promise<PROTO.ActivateProjectResponse> {
    return await firstValueFrom(this.projectServiceClient.activateProject(activateProjectDto));
  }

  async deactivateProject(deactivateProjectDto: DTO.ProjectStatusDto): Promise<PROTO.DeactivateProjectResponse> {
    return await firstValueFrom(this.projectServiceClient.deactivateProject(deactivateProjectDto));
  }

  async addTasksToProject({ projectId, tasks }: DTO.AddTaskToProjectDto): Promise<PROTO.AddTasksToProjectResponse> {
    return await firstValueFrom(this.projectServiceClient.addTasksToProject({ projectId, tasks }));
  }

  async removeTasksToProject({ projectId, tasksIds }: DTO.RemoveTaskToProjectDto): Promise<PROTO.RemoveTasksToProjectResponse> {
    return await firstValueFrom(this.projectServiceClient.removeTasksToProject({ projectId, tasksIds }));
  }

  async addLaborersToProject({ projectId, taskId, laborers }: DTO.LaborersToProjectDto): Promise<PROTO.AddLaborersToProjectResponse> {
    return await firstValueFrom(this.projectServiceClient.addLaborersToProject({ projectId, taskId, laborers }));
  }

  async removeLaborersToProject({ projectId, taskId, laborers }: DTO.LaborersToProjectDto): Promise<PROTO.RemoveLaborersToProjectResponse> {
    return await firstValueFrom(this.projectServiceClient.removeLaborersToProject({ projectId, taskId, laborers }));
  }
}
