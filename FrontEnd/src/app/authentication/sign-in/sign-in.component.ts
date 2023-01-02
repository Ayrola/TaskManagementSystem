import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error-service';
import { AuthService } from '../authService';

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
    this.isSignedUp = !this.isSignedUp;
  }

  async onSubmit(form: NgForm)
  {
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
            console.log(resData);
            localStorage.setItem('token', resData.accessToken);
            this.isLoading = false;
            this.router.navigate(['/tasks'])
          },
          error: (resData)=>
          {
            this.error = this.errorService.handleSignInError();
            this.isLoading = false;
          }
        });
    }
    else{
      this.authService.signUp(username, password).subscribe(
        {
          next: (resData) =>
          {
            localStorage.setItem('token', resData.accessToken);
            this.router.navigate(['/tasks'])
            this.isLoading = false;
          },
          error: (resData)=>
          {
            this.error = this.errorService.handleSignUpError(resData);
            this.isLoading = false;
          }
        });
    }
    form.reset();
  }
}
