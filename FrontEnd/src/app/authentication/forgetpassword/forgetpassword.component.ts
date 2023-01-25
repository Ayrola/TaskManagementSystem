import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
  }

  changePassword(form: NgForm){
    const password = form.value.password;
    let path = window.location.pathname;
    let username = path.split('/')[2];

    this.authService.changePassword(username, password);
    this.router.navigate(['/signIn'])
  }

}
