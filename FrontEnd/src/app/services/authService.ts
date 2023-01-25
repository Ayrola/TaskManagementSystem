import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap } from "rxjs";
import { ErrorService } from "./error-service";
import { UserAuthResponseData } from "../authentication/userAuthResponseData";
import { User } from "../authentication/user.module";

@Injectable({providedIn: 'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);

    constructor(private httpClient: HttpClient, private errorService: ErrorService) {
    }

    signIn(userName: string, password: string)
    {
        return this.httpClient.post<UserAuthResponseData>(
            'http://localhost:3000/auth/signIn',
            {
                username: userName,
                password: password,
            }
        ).pipe(catchError(this.errorService.handleError), 
        tap(resData => {this.handleAuthentication(resData.accessToken, resData.email, resData.isActive, resData.username)}));
    }

    signUp(userName: string, password: string, email: string)
    {
        return this.httpClient.post<UserAuthResponseData>(
            'http://localhost:3000/auth/signUp',
            {
                username: userName,
                password: password,
                email: email,
            }
        ).pipe(catchError(this.errorService.handleError));
    }

    activateUser(userName: string)
    {
        console.log(userName);
        this.httpClient.post<UserAuthResponseData>(
            'http://localhost:3000/auth/activateUser',
            {
                username: userName,
            }
        ).subscribe();
        console.log(userName);
    }

    private async handleAuthentication(accessToken: string, email: string, isActive: boolean, username: string)
    {
        console.log(isActive);
        if(isActive)
        {
            const expirationTokenMiliseconds = JSON.parse(window.atob(accessToken.split('.')[1])).exp;
            const expirationDate = new Date(expirationTokenMiliseconds*1000);
            const user = new User(email, username, isActive, accessToken, expirationDate);

            this.user.next(user);
        }
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}