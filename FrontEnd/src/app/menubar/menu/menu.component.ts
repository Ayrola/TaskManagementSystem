import { Component, OnDestroy, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  router: AppRoutingModule;
  private userSub: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      user =>
      {
        this.isAuthenticated = !!user;
      })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
