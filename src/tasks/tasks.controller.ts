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
    return this.tasksService.create(createTaskDto);
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



  // @Get('projects')
  // @UseInterceptors(ClassSerializerInterceptor)
  // async findAllProjects(@Body() findAllProjectsDto: DTO.FindAllProjectsDto): Promise<PROTO.ProjectFindAllResponse> {
  //   const { data, error, status } = await this.projectService.findAllProjects(findAllProjectsDto);
  //   let projects = [];

  //   if (data && data.length > 0) {
  //     projects = data.map((project) => new DTO.ProjectDto(project));
  //   }

  //   return {
  //     error,
  //     data: projects,
  //     status,
  //   };
  // }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
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
