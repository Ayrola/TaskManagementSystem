import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  public tasks: any;
  // public heroDialog: boolean = false;
  // public hero : Hero = {} as Hero;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks()
  {
    this.taskService.getAllTasks().subscribe({
      next: (tasks: any) => {
        let parsedTasks = tasks.map((t: any) => {
          return { ...t}
        })
        this.tasks = parsedTasks;
      },
      error: (err) => {},
    });
  }

  // showDialog()
  // {
  //   this.heroDialog = true;
  // }

  // createHero()
  // {
  //   this.heroService.createHero(this.hero).subscribe({
  //     next: (hero) =>
  //     {
  //       this.hero = {} as Hero;
  //       this.heroDialog = false;
  //       this.loadHeroes();
  //     },
  //     error: (err) =>
  //     {
  //       console.log(err);
  //     },
  //   });
  //   this.heroDialog = false;
  // }
}