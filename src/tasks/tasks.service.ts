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

  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  async findAllTasks(findAllTasksDto: DTO.FindAllTasksDto) {
    console.log(" ------------ TESTE -------------")
    return await firstValueFrom(this.taskServiceClient.findAll(findAllTasksDto));
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  // update(id: number, updateTaskDto: UpdateTaskDto) {
  //   return `This action updates a #${id} task`;
  // }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}





// @Injectable()
// export class ProjectService {
