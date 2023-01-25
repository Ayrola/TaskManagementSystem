import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskService } from '../services/task-service';
import { TaskEditFormComponent } from './task-edit-form/task-edit-form.component';
import { TaskAddFormComponent } from './task-add-form/task-add-form.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [TaskListComponent, TaskEditFormComponent, TaskAddFormComponent],
  imports: [
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
  ],
  providers: [TaskService],
  bootstrap: [],
})
export class TaskModule {}
