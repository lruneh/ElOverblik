import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { MeteringPoint } from 'src/app/models/metering-point';
import { MeteringPointRootObject } from 'src/app/models/metering-points';
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
  metoringPoints: MeteringPointRootObject = { result: [{}] } as MeteringPointRootObject;
  skipShortLived: boolean = false;
  constructor(private _tokenService: TokenRepositoryService) { }
  refreshToken: RefreshToken = RefreshTokenJson;
  shortToken: any;


  test: any;
  ngOnInit(): void {

    //todo: alt dette skal refaktoreres ud i metoder
    let today = new Date;

    //Is shortLivedToken out of date => check if RefreshToken is valid => get new ShortLivedToken
    this.shortToken = plainToClass(RefreshToken, this.shortLivedToken);
    let shortTokenDate = new Date(this.shortToken.date)
    let shortTokenDatePlusOneYear = shortTokenDate.setFullYear(shortTokenDate.getFullYear() + 1)

    if(shortTokenDatePlusOneYear > today.getTime() ) {

      //Get metering Points
      this._tokenService.getMeteringpoints(`Bearer ${this.shortToken.token}`).subscribe((data) => {
        this.metoringPoints.result[0].streetCode = data.result[0].streetCode,
        this.metoringPoints.result[0].streetName = data.result[0].streetName,
        this.metoringPoints.result[0].buildingNumber = data.result[0].buildingNumber,
        this.metoringPoints.result[0].floorId = data.result[0].floorId,
        this.metoringPoints.result[0].roomId = data.result[0].roomId,
        this.metoringPoints.result[0].citySubDivisionName = data.result[0].citySubDivisionName,
        this.metoringPoints.result[0].municipalityCode = data.result[0].municipalityCode,
        this.metoringPoints.result[0].locationDescription = data.result[0].locationDescription,
        this.metoringPoints.result[0].settlementMethod = data.result[0].settlementMethod,
        this.metoringPoints.result[0].meterReadingOccurrence = data.result[0].meterReadingOccurrence,
        this.metoringPoints.result[0].firstConsumerPartyName = data.result[0].firstConsumerPartyName,
        this.metoringPoints.result[0].secondConsumerPartyName = data.result[0].secondConsumerPartyName,
        this.metoringPoints.result[0].meterNumber = data.result[0].meterNumber,
        this.metoringPoints.result[0].consumerStartDate = data.result[0].consumerStartDate,
        this.metoringPoints.result[0].meteringPointId = data.result[0].meteringPointId,
        this.metoringPoints.result[0].typeOfMP = data.result[0].typeOfMP,
        this.metoringPoints.result[0].balanceSupplierName = data.result[0].balanceSupplierName,
        this.metoringPoints.result[0].postcode = data.result[0].postcode,
        this.metoringPoints.result[0].cityName = data.result[0].cityName,
        this.metoringPoints.result[0].hasRelation = data.result[0].hasRelation,
        this.metoringPoints.result[0].consumerCVR = data.result[0].consumerCVR,
        this.metoringPoints.result[0].dataAccessCVR = data.result[0].dataAccessCVR,
        this.metoringPoints.result[0].childMeteringPoints = data.result[0].childMeteringPoints
      });
    }
    else {
      //If refreshToken is out of date, ask for a new one => get new shortLivedToken
      let refreshToken = plainToClass(RefreshToken, this.refreshToken);
      let refreshTokenDate = new Date(refreshToken.date);
      let refreshTokenDatePlusOneYear = refreshTokenDate.setFullYear(refreshTokenDate.getFullYear() + 1)

      if (refreshTokenDatePlusOneYear < today.getTime()) {
        //Ask for new RefreshToken => update the json file

        //Get new ShortLivedToken => update the json file
        this._tokenService.getShortLivedToken(`Bearer ${refreshToken.token}`).subscribe((data: { result: string; }) => {
          this.shortLivedToken.date = today.toString();
          this.shortLivedToken.token = data.result;
        });
      }
      else{
//Get new Short Lived Token =Z update the json file
this._tokenService.getShortLivedToken(`Bearer ${refreshToken.token}`).subscribe((data: { result: string; }) => {
  this.shortLivedToken.date = today.toString();
  this.shortLivedToken.token = data.result;
});
      }

    }
  }
}
