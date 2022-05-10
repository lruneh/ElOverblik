import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { RootObject } from 'src/app/models/metering-points';
import { RefreshToken } from 'src/app/models/refresh-token';
import { TokenRepositoryService } from 'src/app/services/token-repositories/token-repository.service';
import * as RefreshTokenJson from '../../../assets/refresh-token.json';
import * as ShortLivedTokenJson from '../../../assets/short-lived-token.json';



@Component({
  selector: 'app-overblik-main',
  templateUrl: './overblik-main.component.html',
  styleUrls: ['./overblik-main.component.scss']
})
export class OverblikMainComponent implements OnInit {

  title: string = "Overblik Main";
  value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJDdXN0b21lckFQSV9SZWZyZXNoIiwidG9rZW5pZCI6IjAyNzc3ZTA2LWYxNmMtNGFjNy1hNGQwLTJkYzQzMjI4N2UxYiIsIndlYkFwcCI6WyJDdXN0b21lckFwaSIsIkN1c3RvbWVyQXBwQXBpIl0sImp0aSI6IjAyNzc3ZTA2LWYxNmMtNGFjNy1hNGQwLTJkYzQzMjI4N2UxYiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiUElEOjkyMDgtMjAwMi0yLTI0ODAyMzQ1NzY4MCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6Ikxhc3NlIFJ1bmUgSGFuc2VuIiwibG9naW5UeXBlIjoiS2V5Q2FyZCIsInBpZCI6IjkyMDgtMjAwMi0yLTI0ODAyMzQ1NzY4MCIsInR5cCI6IlBPQ0VTIiwidXNlcklkIjoiNDIzNDMiLCJleHAiOjE2ODMwNTI1OTcsImlzcyI6IkVuZXJnaW5ldCIsInRva2VuTmFtZSI6IkFuZ3VsYXIiLCJhdWQiOiJFbmVyZ2luZXQifQ.lYGhXT_e3ctieUlpCJZHcFrlfSlNnaZyY5Sd8b3gIZo';
  shortLivedToken: RefreshToken = ShortLivedTokenJson;
  metoringPoints: RootObject = { result: [{}] } as RootObject;
  skipShortLived: boolean = false;
  constructor(private _tokenService: TokenRepositoryService) { }
  refreshToken: RefreshToken = RefreshTokenJson;
  shortToken: any;


  test: any;
  ngOnInit(): void {

    //todo: alt dette skal refaktoreres ud i metoder

    let today = new Date;
    //Is shortLivedToken out of date => check if RefreshToken is valid => get new ShortLivedToken
    let shortTokenJson = JSON.stringify(this.shortLivedToken);
    this.shortToken = plainToClass(RefreshToken, this.refreshToken);
    let shortTokenDate = new Date(this.shortToken.date)
    if (today.getTime() - shortTokenDate.getTime() > 0) {

      //Get metering Points
    }
    else {
      //If refreshToken is out of date, ask for a new one => get new shortLivedToken
      let refreshTokenJson = JSON.stringify(RefreshTokenJson);
      let refreshToken = plainToClass(RefreshToken, this.refreshToken);
      let refreshTokenDate = new Date(refreshToken.date);

      if (today.getTime() - refreshTokenDate.getTime() <= 0) {
        //Ask for new RefreshToken => update the json file

        //Get new ShortLivedToken => update the json file
        this._tokenService.getShortLivedToken(`Bearer ${refreshToken.token}`).subscribe((data: { result: string; }) => {
          this.shortLivedToken.date = today.toString();
          this.shortLivedToken.token = data.result;
        });
      }
      //Get new Short Lived Token =Z update the json file
      this._tokenService.getShortLivedToken(`Bearer ${refreshToken.token}`).subscribe((data: { result: string; }) => {
        this.shortLivedToken.date = today.toString();
        this.shortLivedToken.token = data.result;
      });
    }
  }
}
