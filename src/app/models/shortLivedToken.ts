export class ShortLivedToken {
  private _token: string = "";
  private _date: Date = new Date;

  // constructor(date: Date, token: string) {
  //   // set the actual value of status
  //   this._date = date;
  //   this._token = token;
  // }

  public get shortLivedToken(){
    return ShortLivedToken;
  }

public get date(): Date{
 return this._date;
}

public get token(): string{
  return this._token;
}

public set date(date: Date){
  this._date = date;
}

public set token(token: string){
  this._token = token;
}

}
