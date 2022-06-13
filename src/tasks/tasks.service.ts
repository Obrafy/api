import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateTaskDto } from './dto/task.dto';

import * as PROTO from 'src/common/proto/project-service/project.pb';
import * as DTO from 'src/tasks/dto/task.dto';

@Injectable()
export class TasksService {

  private taskServiceClient: PROTO.TaskServiceClient;

  @Inject(PROTO.PROJECT_PACKAGE_NAME)
  private readonly grpcClient: ClientGrpc;


  /**
   * This runs once when the module's instantiate the service.
   *
   * {@link https://docs.nestjs.com/fundamentals/lifecycle-events#lifecycle-events-1 Documentation}
   */
  public onModuleInit(): void {
    this.taskServiceClient = this.grpcClient.getService<PROTO.TaskServiceClient>(PROTO.TASK_SERVICE_NAME);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<PROTO.TaskCreateResponse> {
    return await firstValueFrom(this.taskServiceClient.create(createTaskDto));
  }

  async findAllTasks(findAllTasksDto: DTO.FindAllTasksDto): Promise<PROTO.TaskFindAllResponse> {
    return await firstValueFrom(this.taskServiceClient.findAll(findAllTasksDto));
  }

  async findOneTask(findTaskDto: DTO.FindTaskDto): Promise<PROTO.TaskFindOneResponse> {
    return await firstValueFrom(this.taskServiceClient.findOne(findTaskDto));
  }

  async removeTask(removeTaskDto: DTO.FindTaskDto): Promise<PROTO.TaskRemoveResponse> {
    return await firstValueFrom(this.taskServiceClient.remove(removeTaskDto));
  }

  async activateTask(activateTaskDto: DTO.TaskStatustDto): Promise<PROTO.ActivateTaskResponse> {
    return await firstValueFrom(this.taskServiceClient.activateTask(activateTaskDto));
  }

  async deactivateTask(deactivateTaskDto: DTO.TaskStatustDto): Promise<PROTO.DeactivateTaskResponse> {
    return await firstValueFrom(this.taskServiceClient.deactivateTask(deactivateTaskDto));
  }

  // update(id: number, updateTaskDto: UpdateTaskDto) {
  //   return `This action updates a #${id} task`;
  // }
}





// @Injectable()
// export class ProjectService {
