export class User
{
    constructor(
        public email: string,
        public username: string,
        public isActive: boolean,
        private _token: string,
        private _tokenExpirationDate: Date,
    ) {
        
    }

    // This is checking if a valid token with valid expiration date is returned from the server
    get token(){
        if(!this._tokenExpirationDate || new Date()> this._tokenExpirationDate)
        {
            return null;
        }
        return this._token;
    }
}