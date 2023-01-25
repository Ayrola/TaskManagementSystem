import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task-service';
import { TasksModel } from '../tasksResponseData';

interface TaskStatus {
  name: string
}
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  public tasks: TasksModel[];
  taskDialog: boolean = false;
  taskTitle: string;
  taskStatus: string;
  taskDescription: string;
  taskStatuses: TaskStatus[];
  selectedStatus: TaskStatus;

  constructor(private taskService: TaskService) { 
    this.taskStatuses = [
      {name: 'OPEN',},
      {name: 'IN_PROGRESS',},
      {name: 'DONE',},
      {name: 'BLOCKED'}
  ];
  }

  ngOnInit(): void {
    this.loadTasks();
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

  showEditDialog()
  {
    this.taskDialog = true;
  }

  closeDialogAndSave()
  {
    this.taskDialog = false;
  }
}
