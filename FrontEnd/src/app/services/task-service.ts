import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http.get(`${environment.backendUrl}/task`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }}
      ,);
  }

//   createHero(task: Task)
//   {
//     return this.http.post(`${environment.backendUrl}/hero`, task);
//   }
}
