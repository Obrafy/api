import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

import * as DTO from './dto/task.dto';
import * as PROTO from 'src/common/proto/project-service/project.pb';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post('tasks')
  async createTask(@Body() createTaskDto: DTO.CreateTaskDto) {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Get('tasks')
  @UseInterceptors(ClassSerializerInterceptor)
  async findAllTasks(@Body() findAllProjectsDto: DTO.FindAllTasksDto): Promise<PROTO.TaskFindAllResponse> {
    const { data, error, status } = await this.tasksService.findAllTasks(findAllProjectsDto)
    let tasks = [];

    if (data && data.length > 0) {
      tasks = data.map((task) => new DTO.TaskDto(task));
    }

    return {
      error,
      data: tasks,
      status,
    }
  }

  @Get('task/:taskId')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOneTask(@Param('taskId') taskId: DTO.FindTaskDto['taskId']): Promise<PROTO.TaskFindOneResponse> {
    let { data, error, status } = await this.tasksService.findOneTask({ taskId });

    if (data) {
      data = new DTO.TaskDto(data);
    }

    return { data, error, status };
  }

  @Delete('task/:taskId')
  @UseInterceptors(ClassSerializerInterceptor)
  async removeTask(@Param('taskId') taskId: DTO.RemoveTaskDto['taskId']): Promise<PROTO.TaskRemoveResponse> {
    return await this.tasksService.removeTask({ taskId });
  }


  @Post('task/:taskId/activate')
  async activateTask(@Param('taskId') taskId: DTO.TaskStatustDto['taskId']): Promise<PROTO.ActivateTaskResponse> {
    return await this.tasksService.activateTask({ taskId });
  }

  @Post('task/:taskId/deactivate')
  async deactivateTask(@Param('taskId') taskId: DTO.TaskStatustDto['taskId']): Promise<PROTO.DeactivateTaskResponse> {
    return await this.tasksService.deactivateTask({ taskId });
  }

  @Post('task/:taskId/skills')
  async addSkillToTask(
    @Param('taskId') taskId: DTO.AddSkillToTaskDto['taskId'],
    @Body('skills') skills: DTO.AddSkillToTaskDto['skills']): Promise<PROTO.AddSkillToTaskResponse> {
    return await this.tasksService.addSkillToTask({ taskId, skills });
  }

  @Delete('task/:taskId/skills')
  async removeSkillToTask(
    @Param('taskId') taskId: DTO.RemoveSkillToTaskDto['taskId'],
    @Body('skillIds') skillIds: DTO.RemoveSkillToTaskDto['skillIds']
  ): Promise<PROTO.RemoveSkillToTaskResponse> {
    return await this.tasksService.removeSkillToTask({ taskId, skillIds });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.update(+id, updateTaskDto);
  // }

}
