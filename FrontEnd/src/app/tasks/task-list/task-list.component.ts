import { Component, OnInit } from '@angular/core';
import { ProjectModel } from 'src/app/projects/projectsResponseData';
import { ProjectService } from 'src/app/services/project-service';
import { TaskService } from 'src/app/services/task-service';
import { TasksModel } from '../tasksResponseData';

interface TaskStatus {
  name: string
}
interface UsersProjects {
  name: string
}
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  public projects: ProjectModel[];
  public tasks: TasksModel[];
  public usersProjects: UsersProjects[] = [];
  public selectedProject: UsersProjects;
  taskDialog: boolean = false;
  taskTitle: string;
  taskStatus: string;
  taskDescription: string;
  taskStatuses: TaskStatus[];
  selectedStatus: TaskStatus;
  popupTitle: string;
  popupDescription: string;
  popupTaskId: string;

  constructor(private taskService: TaskService, private projectService: ProjectService) { 
    this.taskStatuses = [
      {name: 'OPEN',},
      {name: 'IN_PROGRESS',},
      {name: 'DONE',},
      {name: 'BLOCKED'}
  ];
  }

  ngOnInit(): void {
    this.loadTasks();
    this.loadProjects();
  }

  loadTasks()
  {
    this.taskService.getAllTasks().subscribe({
      next: (tasks: TasksModel[]) => {
        let parsedTasks = tasks.map((t: TasksModel) => {
          return { ...t}
        })
        this.tasks = parsedTasks;
      },
      error: (err) => {},
    });
  }

  deleteTask(id: string){
    this.taskService.deleteTask(id).subscribe({
      next: ()=> 
      {
        this.loadTasks();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  blockTask(id: string){
    this.taskService.blockTask(id).subscribe({
      next: ()=> 
      {
        this.loadTasks();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  showEditDialog(tasktitle: string, taskDecription: string, taskId: string)
  {
    this.popupTitle = tasktitle;
    this.popupDescription = taskDecription;
    this.popupTaskId = taskId;
    this.taskDialog = true;
  }

  closeDialogAndSave()
  {
    this.taskService.updateTask(this.taskTitle, this.taskDescription, this.popupTaskId).subscribe({
      next: ()=> 
      {
        this.loadTasks();
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.taskDialog = false;
  }

  async loadProjects()
  {
    this.projectService.getAllProjects().subscribe({
      next: (projects: ProjectModel[]) => {
        let parsedProject = projects.map((p: ProjectModel) => {
          this.usersProjects.push({name: p.title});
          return { ...p}
        })
        this.projects = parsedProject;
        console.log(parsedProject);
      },
      error: (err) => {},
    });

    console.log(this.usersProjects);
  }
}
