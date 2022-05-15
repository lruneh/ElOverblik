import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { CookieService } from 'ngx-cookie-service';
import { Aggregation } from 'src/app/models/aggregation';
import { MeteringPointRootObject } from 'src/app/models/metering-points';
import { RefreshToken } from 'src/app/models/refresh-token';
import { ShortLivedToken } from 'src/app/models/shortLivedToken';
import { MyEnergyDataMarketDocument} from 'src/app/models/time-series';
import { TimeSeriesRepositoryService } from 'src/app/services/time-series-repository/time-series-repository.service';
import { TokenRepositoryService } from 'src/app/services/token-repositories/token-repository.service';
import * as RefreshTokenJson from '../../../assets/refresh-token.json';

@Component({
  selector: 'app-overblik-main',
  templateUrl: './overblik-main.component.html',
  styleUrls: ['./overblik-main.component.scss']
})
export class OverblikMainComponent implements OnInit {

  title: string = "Overblik Main";

  shortToken: ShortLivedToken = new ShortLivedToken();


  refreshToken: RefreshToken = RefreshTokenJson;

  meteringPoints: MeteringPointRootObject = { result: [{}, {}] } as MeteringPointRootObject;

  constructor(private _tokenService: TokenRepositoryService, private _timeSeriesRepositoryService: TimeSeriesRepositoryService, private _cookieService: CookieService) { }

  myEnergyData: any[] = [];
  test: any;
  ngOnInit(): void {

    //Get data
    this.initializeTokenOperations();
    //this.getTimeSeries();
    this._cookieService.set('refreshToken', JSON.stringify(this.refreshToken))
  }
  getTimeSeries() {
    this.meteringPoints.result.forEach((element, index) => {
      this._timeSeriesRepositoryService.getTimeSeries(`Bearer ${this.shortToken.token}`, "2022-01-01", "2022-05-14", Aggregation.Day, element.meteringPointId).subscribe(
        (data: { result: { MyEnergyData_MarketDocument: MyEnergyDataMarketDocument; }[]; }) => {
          let points: object[] = [];
          data.result[0].MyEnergyData_MarketDocument.TimeSeries[0].Period.forEach(element => {
            const timeInterval = `${element.timeInterval.start} : ${element.timeInterval.end}`;
            const pointMeasurement: string = element.Point[0]["out_Quantity.quantity"];
             points.push({'timeInterval': timeInterval, 'pointQuantity': pointMeasurement});


          });;
          this.myEnergyData.push({'supplier': this.meteringPoints.result[index].balanceSupplierName, 'supplierTimeSeries': [points]})

        });
    });
  }

  private initializeTokenOperations() {
    let today = new Date;

    //Is shortLivedToken out of date => check if RefreshToken is valid => get new ShortLivedToken
    let shortLivedCookie: ShortLivedToken = JSON.parse(this._cookieService.get('shortToken'));
    // shortLivedCookie.date = JSON.parse(this._cookieService.get('shortToken'));
    // shortLivedCookie.token = JSON.parse(this._cookieService.get('shortToken'));

    this.shortToken.date = shortLivedCookie.date;
    this.shortToken.token = shortLivedCookie.token;
    //JSON.parse(this._cookieService.get('shortToken'));

    if (this.shortToken.date && this.shortTokenIsFresh(today, new Date(this.shortToken.date))) {

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

  private refreshTokenIsFresh(tokenDate: Date, today: Date): boolean {
    let tokenExpirationDate = tokenDate.setFullYear(tokenDate.getFullYear() + 1)

    if (tokenExpirationDate < today.getTime()) {
      return false;
    }
    return true;
  }

  private getMeteringPoints() {
    this._tokenService.getMeteringpoints(`Bearer ${this.shortToken.token}`).subscribe((data) => {
      data.result.forEach((element, index: number) => {
        this.meteringPoints.result[index].streetCode = element.streetCode,
          this.meteringPoints.result[index].streetName = element.streetName,
          this.meteringPoints.result[index].buildingNumber = element.buildingNumber,
          this.meteringPoints.result[index].floorId = element.floorId,
          this.meteringPoints.result[index].roomId = element.roomId,
          this.meteringPoints.result[index].citySubDivisionName = element.citySubDivisionName,
          this.meteringPoints.result[index].municipalityCode = element.municipalityCode,
          this.meteringPoints.result[index].locationDescription = element.locationDescription,
          this.meteringPoints.result[index].settlementMethod = element.settlementMethod,
          this.meteringPoints.result[index].meterReadingOccurrence = element.meterReadingOccurrence,
          this.meteringPoints.result[index].firstConsumerPartyName = element.firstConsumerPartyName,
          this.meteringPoints.result[index].secondConsumerPartyName = element.secondConsumerPartyName,
          this.meteringPoints.result[index].meterNumber = element.meterNumber,
          this.meteringPoints.result[index].consumerStartDate = element.consumerStartDate,
          this.meteringPoints.result[index].meteringPointId = element.meteringPointId,
          this.meteringPoints.result[index].typeOfMP = element.typeOfMP,
          this.meteringPoints.result[index].balanceSupplierName = element.balanceSupplierName,
          this.meteringPoints.result[index].postcode = element.postcode,
          this.meteringPoints.result[index].cityName = element.cityName,
          this.meteringPoints.result[index].hasRelation = element.hasRelation,
          this.meteringPoints.result[index].consumerCVR = element.consumerCVR,
          this.meteringPoints.result[index].dataAccessCVR = element.dataAccessCVR,
          this.meteringPoints.result[index].childMeteringPoints = element.childMeteringPoints;
      });

    });
  }

  private getNewShortLivedToken(refreshToken: RefreshToken, today: Date) {
    this._tokenService.getShortLivedToken(`Bearer ${refreshToken.token}`).subscribe((data: { result: string; }) => {
      this.shortToken.date = today;
      this.shortToken.token = data.result;
      this._cookieService.set('shortToken', JSON.stringify(this.shortToken));
      this.getMeteringPoints();
    });
  }
}
