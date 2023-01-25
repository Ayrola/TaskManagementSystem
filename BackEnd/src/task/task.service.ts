import { Get, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './Dtos/create-task.dto';
import { GetTaskFilterDto } from './Dtos/get-tasks-filter.dto';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';
@Injectable()
export class TaskService {
  private logger = new Logger('TaskService');
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}

  private tasks: Task[] = [];

  getAllTasks(user: User) : Promise<Task[]> {
    try {
      return this.taskRepository.find({relations: {
        user: true,
        project: true
      },
    where: {user}});
    } catch (error) {
      this.logger.error(`${user.username} tryies to get all tasks.`, error.stack)
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User) : Promise<Task> {
    let createdTask;
    const {title, description} = createTaskDto
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    try {
      createdTask = await this.taskRepository.save(task);
    } catch (error) {
      this.logger.error(`${user.username} try to save object into the database. Data: ${JSON.stringify(task)}`, error.stack);
      throw new InternalServerErrorException();
    }
    
    try {
      createdTask = await this.taskRepository.findOne({
        where: { id: createdTask.id },
      });
      return createdTask;
    } catch (error) {
      this.logger.error(`${user.username} try to find object from the database. Data: ${JSON.stringify(task)}`, error.stack);
      throw new InternalServerErrorException();
    }
    
  }

  async getTaskById(id: string, user: User) : Promise<Task>
  {
      let createdTask = await this.taskRepository.findOne({
      where: { id: id },
    });

    if(!createdTask)
    {
      this.logger.error(`${user.username} try to get task by id: ${id}`);
      throw new NotFoundException(`Task with ID: "${id}" not found`);
    }
      
    return createdTask;
  }

  async deleteTaskById(id: string, user: User): Promise<void>
  {
    const found = await this.getTaskById(id, user);
    let result = this.taskRepository.delete({ id });
    if((await result).affected === 0)
    {
      this.logger.error(`${user.username} try to delete task by id: ${id}`);
      throw new NotFoundException(`Task with ID: "${id}" not found`);
    }
  }

  async updateTaskStatusById(id: string, status: TaskStatus, user: User): Promise<Task>
  {
    const task = await this.getTaskById(id, user);
    task.status = status;
    this.taskRepository.save(task);

    return task;
  }

  async updateStatusInfo(id: string, title: string, description: string, user: User): Promise<Task>
  {
    const task = await this.getTaskById(id, user);
    task.title = title;
    task.description = description;
    this.taskRepository.save(task);

    return task;
  }

  async getTasksFiltered(tasksFilterDto: GetTaskFilterDto, user: User): Promise<Task[]>
  {
    //TODO (Ayrola 24/11/2022) use queryBuilder.
    // add case insensitivity inside the query build
    const {status, search } = tasksFilterDto;

    let tasksTemp = await this.getAllTasks(user); 
    this.logger.error(`${user.username} try to filter tasks with filter: ${JSON.stringify(tasksFilterDto)}`);
    if(status)
    {
      tasksTemp = tasksTemp.filter((task) => task.status === status);
    }

    if(search)
    {
      tasksTemp = tasksTemp.filter((task) => {
        if(task.title.includes(search) || task.description.includes(search))
        {
          return true;
        }
        return false;
      });
    }
    
    
    return tasksTemp;
  }
}
