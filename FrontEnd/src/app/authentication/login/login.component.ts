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
            localStorage.setItem('token', resData.accessToken);
            const expiration = JSON.parse(window.atob(resData.accessToken.split('.')[1])).exp;

            console.log(new Date(expiration*1000));
            this.isLoading = false;
            this.router.navigate(['/tasks'])
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
            localStorage.setItem('token', resData.accessToken);
            this.router.navigate(['/tasks'])
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
