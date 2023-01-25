import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectModel } from '../projects/projectsResponseData';
import { AuthService } from './authService';

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllProjects() {
    let accessToken: string;
    this.authService.user.pipe(
      take(1)).subscribe(user =>{
        accessToken = user.token;
      })

    console.log(accessToken);
    return this.http.get<ProjectModel[]>(`${environment.backendUrl}/project`,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }}
      ,);
  }

  createProject(title: string, description: string) {
    let accessToken: string;
    this.authService.user.pipe(
      take(1)).subscribe(user =>{
        accessToken = user.token;
      })

    console.log(title);
    console.log(description);
    return this.http.post<ProjectModel>(`${environment.backendUrl}/project`,
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
}
