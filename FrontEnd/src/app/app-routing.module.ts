import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { NotvalidUserComponent } from './authentication/notvalid-user/notvalid-user.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { UserVerificationComponent } from './authentication/user-verification/user-verification.component';
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
  { path: 'notActivatedUser', component: NotvalidUserComponent },
  { path: 'userVerification/:username', component: UserVerificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
