import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task-service';
import { TasksModel } from '../tasksResponseData';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  public tasks: TasksModel[];
  // public heroDialog: boolean = false;
  // public hero : Hero = {} as Hero;

  constructor(private taskService: TaskService) { }

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
}
