import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskService } from '../services/task-service';

@NgModule({
  declarations: [TaskListComponent],
  imports: [
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
  ],
  providers: [TaskService],
  bootstrap: [],
})
export class TaskModule {}
