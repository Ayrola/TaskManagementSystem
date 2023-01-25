import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project-service';
import { ProjectModel } from '../projectsResponseData';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  public projects: ProjectModel[];
  projectDialog: boolean = false;
  taskTitle: string;
  taskStatus: string;
  taskDescription: string;
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects()
  {
    this.projectService.getAllProjects().subscribe({
      next: (projects: ProjectModel[]) => {
        let parsedProject = projects.map((p: ProjectModel) => {
          return { ...p}
        })
        this.projects = parsedProject;
        console.log(this.projects);
      },
      error: (err) => {},
    });
  }

  showEditDialog()
  {
    this.projectDialog = true;
  }

  closeDialogAndSave()
  {
    this.projectDialog = false;
  }
}
