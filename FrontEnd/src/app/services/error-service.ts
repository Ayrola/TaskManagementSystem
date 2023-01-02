import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ErrorService
{
    handleSignInError() : string
    {
        return 'Invalid Credentials!';
    }

    handleSignUpError(resData: any) : string
    {
        let outputMessage: string = '';
        const errorMessages = resData.error.message as Array<string>;
        if(typeof errorMessages === 'string')
        {
            outputMessage = errorMessages;
        }
        else{
            errorMessages.forEach(errorMessage => {
                outputMessage += errorMessage + ';\n\n'
            });
        }
        return outputMessage;
    }
}