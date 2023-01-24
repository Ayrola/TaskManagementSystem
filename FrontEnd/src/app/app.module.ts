import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeroModule } from './hero/hero.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { MenuComponent } from './menubar/menu/menu.component';
import { ButtonModule } from 'primeng/button';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { TaskModule } from './tasks/task.module';
import { UsersModule } from './users-list/users-module';
import { LoginComponent } from './authentication/login/login.component';
import { NotvalidUserComponent } from './authentication/notvalid-user/notvalid-user.component';
import { UserVerificationComponent } from './authentication/user-verification/user-verification.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: 
  [
    AppComponent,
    SignInComponent,
    NotvalidUserComponent,
    MenuComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    UserVerificationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HeroModule,
    TaskModule,
    UsersModule,
    AppRoutingModule,
    PasswordModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
