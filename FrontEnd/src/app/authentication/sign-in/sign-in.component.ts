import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error-service';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isSignedUp = true;
  isLoading = false;
  error:string = null;
  constructor(
      private authService: AuthService,
      private router: Router,
      private errorService: ErrorService) { }

  ngOnInit(): void {
  }

  switchBetweenLoginAndSignUp()
  {
    this.error = null;
    this.isSignedUp = !this.isSignedUp;
  }

  async onSubmit(form: NgForm)
  {
    this.error = null;

    if(!form.valid)
    {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    this.isLoading = true;

    if(this.isSignedUp)
    {
      this.authService.signIn(username, password).subscribe(
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
    else{
      const email = form.value.email;
      this.authService.signUp(username, password, email).subscribe(
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
    }
    form.reset();
  }
}
