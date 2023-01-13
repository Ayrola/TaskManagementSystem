export class User
{
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tenExpirationDate: Date,
    ) {
        
    }

    get token(){
        if(!this._tenExpirationDate || new Date()> this._tenExpirationDate)
        {
            return null;
        }
        return this._token;
    }
}