import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  router: AppRoutingModule;

  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {
        label:'Users',
        icon:'pi pi-fw pi-user',
        routerLink: ['/signIn'],
        styleClass: 'button-at-the-end',
      }]
  }
}
