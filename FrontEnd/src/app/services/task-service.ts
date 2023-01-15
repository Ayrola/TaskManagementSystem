import { NgLocaleLocalization } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TasksModel } from '../tasks/tasksResponseData';
import { AuthService } from './authService';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllTasks() {
    let accessToken: string;
    this.authService.user.pipe(
      take(1)).subscribe(user =>{
        accessToken = user.token;
      })

    console.log(accessToken);
    return this.http.get<TasksModel[]>(`${environment.backendUrl}/task`,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }}
      ,);
  }

  createTask(title: string, description: string) {
    let accessToken: string;
    this.authService.user.pipe(
      take(1)).subscribe(user =>{
        accessToken = user.token;
      })

    console.log(accessToken);
    return this.http.post<TasksModel>(`${environment.backendUrl}/task`,
      {
        title: title,
        description: description
      },
      {
          headers: {
            Authorization: `Bearer ${accessToken}`,
        }
      });
  }

  deleteTask(id: string) {
    let accessToken: string;
    this.authService.user.pipe(
      take(1)).subscribe(user =>{
        accessToken = user.token;
      })

    console.log(accessToken);
    return this.http.delete(`${environment.backendUrl}/task/${id}`,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
        }
      });
  }
}
