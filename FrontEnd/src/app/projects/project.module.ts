import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectService } from '../services/project-service';

@NgModule({
  declarations: [ProjectListComponent],
  imports: [
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
  ],
  providers: [ProjectService],
  bootstrap: [],
})
export class ProjectModule {}
