import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task-service';

interface TaskStatus {
  name: string
}
@Component({
  selector: 'app-task-add-form',
  templateUrl: './task-add-form.component.html',
  styleUrls: ['./task-add-form.component.scss']
})
export class TaskAddFormComponent implements OnInit {
taskStatuses: TaskStatus[];
selectedStatus: TaskStatus;
description: string;
title: string;
  constructor(
    private taskService: TaskService,
    private router: Router) {
      this.taskStatuses = [
        {name: 'OPEN',},
        {name: 'IN_PROGRESS',},
        {name: 'DONE',},
        {name: 'BLOCKED'}
    ];
     }

  ngOnInit(): void {
  }

  async createTask()
  {
    this.taskService.createTask(this.title, this.description).subscribe(
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
        this.title = '';
        this.description = '';
    }
}
