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

  @Post()
  create(@Body() createTaskDto: DTO.CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('tasks')
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Body() findAllProjectsDto: DTO.FindAllTasksDto): Promise<PROTO.TaskFindAllResponse> {
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
  findOne(@Param('taskId') taskId: DTO.FindTaskDto['taskId']): Promise<PROTO.TaskFindOneResponse> {
    return this.tasksService.findOneTask({ taskId });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.update(+id, updateTaskDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
