import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-task-add-form',
  templateUrl: './task-add-form.component.html',
  styleUrls: ['./task-add-form.component.scss']
})
export class TaskAddFormComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private router: Router,) { }

  ngOnInit(): void {
  }

  async onSubmit(form: NgForm)
  {
    if(!form.valid)
    {
      return;
    }
    const title = form.value.title;
    const description = form.value.description;

    this.taskService.createTask(title, description).subscribe(
        {
          next: (resData) =>
          {
            this.router.navigate(['/tasks'])
          },
          error: (resData)=>
          {
            console.log(resData);
          }
        });

        form.reset();
    }
}
