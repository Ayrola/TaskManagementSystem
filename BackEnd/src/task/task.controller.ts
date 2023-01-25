import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './Dtos/create-task.dto';
import { GetTaskFilterDto } from './Dtos/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './Dtos/update-task-status.dto';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAllTasks(@Query() filterDto: GetTaskFilterDto,
  @GetUser() user: User) : Promise<Task[]> {
    if(Object.keys(filterDto).length)
    {
      return this.taskService.getTasksFiltered(filterDto, user);
    }
    else{
      return this.taskService.getAllTasks(user);
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task>
  {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User) : Promise<Task>
  {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string, @GetUser() user: User): Promise<void>
  {
    return this.taskService.deleteTaskById(id, user);
  }

  @Patch('/:id/status')
  updatetaskStatusById(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto, @GetUser() user: User): Promise<Task>
  {
    const {status} = updateTaskStatusDto;
    return this.taskService.updateTaskStatusById(id, status, user);
  }

  @Patch('/:id/update')
  updatetaskInfoById(@Param('id') id: string, @Body('title')title: string, @Body('description')description: string, @GetUser() user: User): Promise<Task>
  {
    return this.taskService.updateStatusInfo(id, title, description, user);
  }
}
