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
      projects = data.map(({ project }) => new DTO.ProjectDto(project));
    }

    return {
      error,
      data: projects,
      status,
    };
  }

  @Get('project/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findProject(@Param('id') id: DTO.FindProjectDto['id']): Promise<PROTO.ProjectFindOneResponse> {
    const { data, error, status } = await this.projectService.findProject({ id });

    if (data && data.project) {
      data.project = new DTO.ProjectDto(data.project);
    }

    return { data, error, status };
  }

  @Delete('project/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async removeProject(@Param('id') id: DTO.RemoveProjectDto['id']): Promise<PROTO.ProjectRemoveResponse> {
    return await this.projectService.removeProject({ id });
  }
}
