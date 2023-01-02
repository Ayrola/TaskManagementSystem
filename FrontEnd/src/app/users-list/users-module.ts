import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UsersListComponent } from './users-list/users-list.component';
import { UserService } from '../services/user.service';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
  ],
  providers: [UserService],
  bootstrap: [],
})
export class UsersModule {}
