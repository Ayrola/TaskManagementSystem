import { Get, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';
import { Project, ProjectStatus } from './project.model';
import { CreateProjectDto } from './Dtos/create-project.dto';
import { TaskService } from 'src/task/task.service';
import { Task } from 'src/task/task.entity';
import { isatty } from 'tty';

@Injectable()
export class ProjectService {
  private logger = new Logger('ProjectService');
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>
  ) {}

  private projects: Project[] = [];

  async createProject(createProjectDto: CreateProjectDto, user: User) : Promise<Project> {
    let createdProject;
    const {title, description} = createProjectDto
    const project = this.projectRepository.create({
      title,
      description,
      status: ProjectStatus.OPEN,
    });

    if(project.users == null)
        {
          project.users = new Array<User>();
        }
        project.users.push(user);

    try {
        createdProject = await this.projectRepository.save(project);
    } catch (error) {
      this.logger.error(`${user.username} try to save object into the database. Data: ${JSON.stringify(project)}`, error.stack);
      throw new InternalServerErrorException();
    }

    try {
        createdProject = await this.projectRepository.findOne({
        where: { id: createdProject.id },
      });

      return createdProject;
    } catch (error) {
      this.logger.error(`${user.username} try to find object from the database. Data: ${JSON.stringify(project)}`, error.stack);
      throw new InternalServerErrorException();
    }
    
  }

  async getAllProjectsForUser(user: User) : Promise<Project[]> {
    try {
      let projects = await this.projectRepository.find({
        relations: {
          users: true,
        },
      });

      let foundProjects: Project[] = [];
      await(projects).forEach(project => {
        if(this.checkIfUserIsAssignedToProject(project, user.id) == true)
        {
          foundProjects.push(project);
        }
      });

      return foundProjects;
    } catch (error) {
      this.logger.error(`${user.username} tryies to get all projects.`, error.stack)
      throw new InternalServerErrorException();
    }
  }

  async assignUserToProject(projectId: string, user: User) : Promise<Project> {
    let foundProject = await this.getProjectById(projectId, user);

    if(foundProject){
      foundProject.users.push(user);
    }

    return await this.projectRepository.save(foundProject);
  }

  async removeUserFromProject(projectId: string, user: User) : Promise<Project> {
    let foundProject = await this.getProjectById(projectId, user);

    if(foundProject){
      let userIndexInArray = this.findUserIndexInUsersArray(foundProject, user.id);
      foundProject.users.splice(userIndexInArray, 1);
    }

    return await this.projectRepository.save(foundProject);
  }

  async getProjectById(projectId: string, user: User) : Promise<Project> {
    try {
      let projects = await this.projectRepository.find({
        relations: {
          users: true,
        },
      });

      let foundProject: Project;
      await(projects).forEach(project => {
        if(project.id == projectId)
        {
          foundProject = project;
        }
      });

      return foundProject;

    } catch (error) {
      this.logger.error(`${user.username} tryies to get a project by ID.`, error.stack)
      throw new InternalServerErrorException();
    }
  }

  checkIfUserIsAssignedToProject(project: Project, userId: string): boolean{
    let isAssigned: boolean = false;

    project.users.forEach(user => {
      if(user.id == userId)
      {
        isAssigned = true;
      }
    });
    return isAssigned;
  }

  findUserIndexInUsersArray(project: Project, userId: string): number{
    let isAssigned: boolean = false;
    let userIndex: number = 0;
    project.users.forEach(user => {
      if(user.id == userId)
      {
        return;
        isAssigned = true;
      }
      userIndex++;
    });
    return userIndex;
  }
}
