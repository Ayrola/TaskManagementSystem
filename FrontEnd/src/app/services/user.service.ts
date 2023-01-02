import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(`${environment.backendUrl}/auth/getAllUsers`);
  }

  deleteUserByUserName(usernameToDelete: string) {
    return this.http.delete(`${environment.backendUrl}/auth/${usernameToDelete}`);
  }
}
