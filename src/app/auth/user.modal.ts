export class User {
  constructor(
    public id:number,
    public email:string,
    public username: string,
    private _token:string,
    private _tokenExpirationDate:Date
  ) {}

  get Gettoken(){
      if(!this._tokenExpirationDate || new Date()>this._tokenExpirationDate){
          return null;
      }
      return this._token
  }
}
