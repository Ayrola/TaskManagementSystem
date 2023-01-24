import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit {
  
  dialogVisibility: boolean = false;
  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
  }

  closeAndValidateUser()
  {
    let path = window.location.pathname;
    let username = path.split('/')[2];
    console.log(username);
    this.authService.activateUser(username);
    this.router.navigate(['/signIn'])
    this.dialogVisibility = false;
  }

  showDialog()
  {
    this.dialogVisibility = true;
  }

}
