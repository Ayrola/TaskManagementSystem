import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  constructor(private authService: AuthService) { }

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
            this.isLoading = false;
          },
          error: (error)=>
          {
            console.log(error);
            this.error = 'An error occured!';
            this.isLoading = false;
          }
        });
    }
    else{
      this.authService.signUp(username, password).subscribe(
        {
          next: (resData) =>
          {
            console.log(resData);
            this.isLoading = false;
          },
          error: (error)=>
          {
            console.log(error);
            this.error = 'An error occured!';
            this.isLoading = false;
          }
        });
    }
    form.reset();
  }
}
