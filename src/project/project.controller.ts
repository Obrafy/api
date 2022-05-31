import { Body, Controller, Post } from '@nestjs/common';
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
}
