import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { HeroListComponent } from './hero/hero-list/hero-list.component';
import { TaskAddFormComponent } from './tasks/task-add-form/task-add-form.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { UsersListComponent } from './users-list/users-list/users-list.component';

const routes: Routes = [
  { path: 'hero-list', component: HeroListComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tasks/add', component: TaskAddFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
