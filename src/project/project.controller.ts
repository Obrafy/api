import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';

import * as DTO from 'src/project/dto/project.dto';
import * as PROTO from 'src/common/proto/project-service/project.pb';
@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('projects')
  async createProject(@Body() createProjectDto: DTO.CreateProjectDto): Promise<PROTO.ProjectCreateResponse> {
    return this.projectService.createProject(createProjectDto);
  }

  @Get('projects')
  @UseInterceptors(ClassSerializerInterceptor)
  async findAllProjects(@Body() findAllProjectsDto: DTO.FindAllProjectsDto): Promise<PROTO.ProjectFindAllResponse> {
    const { data, error, status } = await this.projectService.findAllProjects(findAllProjectsDto);
    let projects = [];

    if (data && data.length > 0) {
      projects = data.map((project) => new DTO.ProjectDto(project));
    }

    return {
      error,
      data: projects,
      status,
    };
  }

  @Get('project/:projectId')
  @UseInterceptors(ClassSerializerInterceptor)
  async findProject(
    @Param('projectId') projectId: DTO.FindProjectDto['projectId'],
  ): Promise<PROTO.ProjectFindOneResponse> {
    console.log('projectId', projectId);
    const { data, error, status } = await this.projectService.findProject({ projectId });

    if (data && data.project) {
      data.project = new DTO.ProjectDto(data.project);
    }

    return { data, error, status };
  }

  @Delete('project/:projectId')
  @UseInterceptors(ClassSerializerInterceptor)
  async removeProject(
    @Param('projectId') projectId: DTO.RemoveProjectDto['projectId'],
  ): Promise<PROTO.ProjectRemoveResponse> {
    return await this.projectService.removeProject({ projectId });
  }

  @Post('project/:projectId/activate')
  @UseInterceptors(ClassSerializerInterceptor)
  async activateProject(
    @Param('projectId') projectId: DTO.ProjectStatusDto['projectId'],
  ): Promise<PROTO.ActivateProjectResponse> {
    return await this.projectService.activateProject({ projectId });
  }

  @Post('project/:projectId/deactivate')
  @UseInterceptors(ClassSerializerInterceptor)
  async deactivateProject(
    @Param('projectId') projectId: DTO.ProjectStatusDto['projectId'],
  ): Promise<PROTO.DeactivateProjectResponse> {
    return await this.projectService.deactivateProject({ projectId });
  }

  @Post('project/:projectId/tasks')
  @UseInterceptors(ClassSerializerInterceptor)
  async addTasksToProject(
    @Param('projectId') projectId: DTO.AddTaskToProjectDto['projectId'],
    @Body('tasks') tasks: DTO.AddTaskToProjectDto['tasks'],
  ): Promise<PROTO.AddTasksToProjectResponse> {
    console.log('projectId', projectId, 'tasks', tasks);
    return await this.projectService.addTasksToProject({ projectId, tasks });
  }

  @Delete('project/:projectId/tasks')
  @UseInterceptors(ClassSerializerInterceptor)
  async removeTasksToProject(
    @Param('projectId') projectId: DTO.RemoveTaskToProjectDto['projectId'],
    @Body('tasksIds') tasksIds: DTO.RemoveTaskToProjectDto['tasksIds'],
  ): Promise<PROTO.RemoveTasksToProjectResponse> {
    return await this.projectService.removeTasksToProject({ projectId, tasksIds });
  }

  @Post('project/:projectId/:taskId/laborers')
  @UseInterceptors(ClassSerializerInterceptor)
  async addLaborersToProject(
    @Param('projectId') projectId: DTO.LaborersToProjectDto['projectId'],
    @Param('taskId') taskId: DTO.LaborersToProjectDto['taskId'],
    @Body('laborers') laborers: DTO.LaborersToProjectDto['laborers'],
  ): Promise<PROTO.AddLaborersToProjectResponse> {
    return await this.projectService.addLaborersToProject({ projectId, taskId, laborers });
  }

  @Delete('project/:projectId/:taskId/laborers')
  @UseInterceptors(ClassSerializerInterceptor)
  async removeLaborersToProject(
    @Param('projectId') projectId: DTO.LaborersToProjectDto['projectId'],
    @Param('taskId') taskId: DTO.LaborersToProjectDto['taskId'],
    @Body('laborers') laborers: DTO.LaborersToProjectDto['laborers'],
  ): Promise<PROTO.RemoveLaborersToProjectResponse> {
    return await this.projectService.removeLaborersToProject({ projectId, taskId, laborers });
  }
}
