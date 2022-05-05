import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getAccessToken = (): Promise<string> => {
    return new Promise(resolve => {
      resolve("---RefreshToken---");
  });
    }
  }

