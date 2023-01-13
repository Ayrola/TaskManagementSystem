import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserAuth } from "./userAuth";

@Injectable({providedIn: 'root'})
export class AuthService{
    constructor(private httpClient: HttpClient) {
    }

    signIn(userName: string, password: string)
    {
        return this.httpClient.post<UserAuth>(
            'http://localhost:3000/auth/signIn',
            {
                username: userName,
                password: password,
            }
        )
    }

    signUp(userName: string, password: string, email: string)
    {
        return this.httpClient.post<UserAuth>(
            'http://localhost:3000/auth/signUp',
            {
                username: userName,
                password: password,
                email: email,
            }
        )
    }
}