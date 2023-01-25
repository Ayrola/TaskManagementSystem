import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService';
import { ErrorService } from 'src/app/services/error-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSignedUp = true;
  isLoading = false;
  username: string;
  password: string;
  email: string;
  error:string = null;
  constructor(
      private authService: AuthService,
      private router: Router,
      private errorService: ErrorService) { }

  ngOnInit(): void {
  }

  async signIn()
  {
    this.error = null;
    this.isLoading = true;

    if(this.isSignedUp)
    {
      this.authService.signIn(this.username, this.password).subscribe(
        {
          next: (resData) =>
          {
            localStorage.setItem('token', resData.accessToken);
            const expiration = JSON.parse(window.atob(resData.accessToken.split('.')[1])).exp;

            this.isLoading = false;
            if(resData.isActive == true)
            {
              this.router.navigate(['/tasks'])
            }
            else{
              this.router.navigate(['/notActivatedUser'])
            }
            
          },
          error: (resData)=>
          {
            this.error = resData;
            this.isLoading = false;
          }
        });
    }
    this.username = '';
    this.password = '';
    this.email = '';
  }

    signUp(){
      this.error = null;
      this.isLoading = true;

      this.authService.signUp(this.username, this.password, this.email).subscribe(
        {
          next: (resData) =>
          {
            console.log(resData);
            if(resData.isActive == true)
            {
              this.router.navigate(['/tasks'])
            }
            else{
              this.router.navigate(['/notActivatedUser'])
            }
            this.isLoading = false;
          },
          error: (resData)=>
          {
            this.error = resData;
            this.isLoading = false;
          }
        });
    this.username = '';
    this.password = '';
    this.email = '';
    }
}
