import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class ErrorService
{
    public handleError(errorRes: HttpErrorResponse)
    {
        console.log(errorRes.error.message);
        console.log(errorRes.error.message[0]);
        let errorMessage = 'An unknow error occured!';
        if(!errorRes.error || !errorRes.error.error)
        {
            return throwError(() => new Error(errorMessage));
        }
        switch (errorRes.error.message)
        {
            case 'Please check your login credentials!':
                errorMessage = 'Invalid Credentials';
                break;
            case 'User already in use':
                errorMessage = 'Username/email already in use!';
                break;
        }
        if(errorRes.error.message[0] == 'password must be longer than or equal to 8 characters')
        {
            errorMessage = 'Follow the password requirements!';
            return throwError(() => new Error(errorMessage));
        }
        else if (errorRes.error.message[0] == 'password too week')
        {
            errorMessage = 'Follow the password requirements!';
            return throwError(() => new Error(errorMessage));
        }
        else if (errorRes.error.message[0] == 'username must be longer than or equal to 4 characters')
        {
            errorMessage = 'Username must be longer than or equal to 4 characters!';
            return throwError(() => new Error(errorMessage));
        }

        return throwError(() => new Error(errorMessage));
    }
}