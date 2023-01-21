import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateProjectDto } from './Dtos/create-project.dto';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Controller('project')
@UseGuards(AuthGuard())
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  getAllProjectsForUser(@GetUser() user: User) : Promise<Project[]> {
      return this.projectService.getAllProjectsForUser(user);
  }

  @Post()
  createTask(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() user: User) : Promise<Project>
  {
    return this.projectService.createProject(createProjectDto, user);
  }

  @Post('/:id')
  assignUserToProject(@Param('id') id: string, @GetUser() user: User): Promise<Project>
  {
    return this.projectService.assignUserToProject(id, user);
  }

  @Post('/:id/remove')
  removeUserFromProject(@Param('id') id: string, @GetUser() user: User): Promise<Project>
  {
    return this.projectService.removeUserFromProject(id, user);
  }
}
