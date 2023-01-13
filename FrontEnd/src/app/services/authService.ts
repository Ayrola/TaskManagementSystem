import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Subject, tap, throwError } from "rxjs";
import { ErrorService } from "./error-service";
import { UserAuthResponseData } from "../authentication/userAuthResponseData";
import { User } from "../authentication/user.module";
import { registerLocaleData } from "@angular/common";

@Injectable({providedIn: 'root'})
export class AuthService{
    user = new Subject<User>();

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
        tap(resData => {this.handleAuthentication(resData.accessToken, resData.email, resData.username)}));
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
        ).pipe(catchError(this.errorService.handleError),
         tap(resData => {this.handleAuthentication(resData.accessToken, resData.email, resData.username)}));
    }

    private handleAuthentication(accessToken: string, email: string, username: string)
    {
        const expirationTokenMiliseconds = JSON.parse(window.atob(accessToken.split('.')[1])).exp;
        const expirationDate = new Date(expirationTokenMiliseconds*1000);
        const user = new User(email, username, accessToken, expirationDate);

        this.user.next(user);
    }
}