import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { CookieService } from 'ngx-cookie-service';
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

  shortLivedToken: RefreshToken = ShortLivedTokenJson;
  refreshToken: RefreshToken = RefreshTokenJson;

  metoringPoints: MeteringPointRootObject = { result: [{}] } as MeteringPointRootObject;

  constructor(private _tokenService: TokenRepositoryService, private _cookieService: CookieService) { }

  shortToken: RefreshToken = { token: '', date: '' };


  test: any;
  ngOnInit(): void {

    //Get data
    this.initializeTokenOperations();
    this._cookieService.set('testCookie', JSON.stringify(this.shortLivedToken));
  }

  private initializeTokenOperations() {
    let today = new Date;

    //Is shortLivedToken out of date => check if RefreshToken is valid => get new ShortLivedToken
    this.shortToken = plainToClass(RefreshToken, this.shortLivedToken);
    if (this.shortTokenIsFresh(new Date(this.shortToken.date), today)) {

      //Get metering Points
      this.getMeteringPoints();
    }
    else {
      //If refreshToken is out of date, ask for a new one => get new shortLivedToken
      let refreshToken = plainToClass(RefreshToken, this.refreshToken);
      if (!this.refreshTokenIsFresh(new Date(refreshToken.date), today)) {
        //Ask for new RefreshToken => update the json file
        console.log('Getting new refreshToken is still not implemented.');
        //Get new ShortLivedToken => update the json file
        this.getNewShortLivedToken(refreshToken, today);
      }
      else {
        //Get new Short Lived Token => update the json file
        this.getNewShortLivedToken(refreshToken, today);
      }
    }
  }

  private shortTokenIsFresh(today: Date, tokenDate: Date): boolean {
    let tokenExpirationDate = tokenDate.setDate(tokenDate.getDate() + 1)

    if (tokenExpirationDate < today.getTime()) {
      return false;
    }
    return true;
  }

  private refreshTokenIsFresh(today: Date, tokenDate: Date): boolean {
    let tokenExpirationDate = tokenDate.setFullYear(tokenDate.getFullYear() + 1)

    if (tokenExpirationDate < today.getTime()) {
      return false;
    }
    return true;
  }

  private getMeteringPoints() {
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
        this.metoringPoints.result[0].childMeteringPoints = data.result[0].childMeteringPoints;
    });
  }

  private getNewShortLivedToken(refreshToken: RefreshToken, today: Date) {
    this._tokenService.getShortLivedToken(`Bearer ${refreshToken.token}`).subscribe((data: { result: string; }) => {
      this.shortLivedToken.date = today.toString();
      this.shortLivedToken.token = data.result;
      this._cookieService.set('shortLived', JSON.stringify(this.shortLivedToken));
    });
  }
}
