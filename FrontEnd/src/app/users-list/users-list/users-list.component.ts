import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public users: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers()
  {
    this.userService.getAllUsers().subscribe({
      next: (users: any) => {
        let parsedTasks = users.map((t: any) => {
          return { ...t}
        })
        this.users = parsedTasks;
      },
      error: (err) => {},
    });
  }

  deleteUser(username: string)
  {
    this.userService.deleteUserByUserName(username).subscribe({
      next: ()=> 
      {
        this.loadUsers();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
