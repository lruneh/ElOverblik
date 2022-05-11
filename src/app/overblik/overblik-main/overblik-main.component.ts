import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { CookieService } from 'ngx-cookie-service';
import { Aggregation } from 'src/app/models/aggregation';
import { GraphData, GraphPoint, Graphs} from 'src/app/models/graph-data';
import { MeteringPointRootObject } from 'src/app/models/metering-points';
import { RefreshToken } from 'src/app/models/refresh-token';
import { MyEnergyDataMarketDocument, SenderMarketParticipantMRid, Result, PeriodTimeInterval, TimeInterval, Point, Period, TimeSeriesRoot, MRid, TimeSery, MarketEvaluationPoint } from 'src/app/models/time-series';
import { TimeSeriesRepositoryService } from 'src/app/services/time-series-repository/time-series-repository.service';
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


  MRid: MRid = {
    codingScheme: '',
    name: ''
  };

  SenderMarketParticipantMRid: SenderMarketParticipantMRid = {
    codingScheme: '',
    name: ''
  };

  MarketEvaluationPoint: MarketEvaluationPoint = {
    mRID: this.MRid
  };

  Point: Point = {
    "out_Quantity.quantity": '',
    "out_Quantity.quality": '',
    position: ''
  };

  TimeInterval: TimeInterval = {
    end: '',
    start: ''
  }

  Period: Period = {
    resolution: '',
    Point: [this.Point],
    timeInterval: this.TimeInterval
  };

  TimeSery: TimeSery = {
    mRID: '',
    curveType: '',
    businessType: '',
    Period: [this.Period],
    "measurement_Unit.name": '',
    MarketEvaluationPoint: this.MarketEvaluationPoint
  }

  PeriodTimeInterval: PeriodTimeInterval = {
end: '',
start: ''
  }

  MyEnergyDataMarketDocument: MyEnergyDataMarketDocument = {
    "period.timeInterval": this.PeriodTimeInterval,
    "sender_MarketParticipant.mRID": this.SenderMarketParticipantMRid,
    "sender_MarketParticipant.name": '',
    mRID: '',
    TimeSeries: [this.TimeSery],
    createdDateTime: ''
  }

  TimeSeriesRoot: TimeSeriesRoot = {
    result: [{
      MyEnergyData_MarketDocument: this.MyEnergyDataMarketDocument,
      errorCode: '',
      errorText: '',
      stackTrace: '',
      id: '',
      success: false
    },
    {
      MyEnergyData_MarketDocument: this.MyEnergyDataMarketDocument,
      errorCode: '',
      errorText: '',
      stackTrace: '',
      id: '',
      success: false
    }]
  }

  Graphs: Graphs = {
    data: [
      {
        Address: '',
        MeteringPointType: '',
        points:
        [
          {
            PointTime: new Date,
            Amount: ''
          }
        ] as GraphPoint[]
      } as GraphData,
      {
        Address: '',
        MeteringPointType: '',
        points:
        [
          {
            PointTime: new Date,
            Amount: ''
          }
        ] as GraphPoint[]} as GraphData
  ]
}

  meteringPoints: MeteringPointRootObject = { result: [{}, {}] } as MeteringPointRootObject;

  constructor(private _tokenService: TokenRepositoryService, private _timeSeriesRepositoryService: TimeSeriesRepositoryService, private _cookieService: CookieService) { }

  shortToken: RefreshToken = { token: '', date: '' };


  test: any;
  ngOnInit(): void {

    //Get data
    this.initializeTokenOperations();
    //this.getTimeSeries();
    this._cookieService.set('testCookie', JSON.stringify(this.shortLivedToken));
  }
  getTimeSeries() {
    this.meteringPoints.result[0].childMeteringPoints.forEach((element, index: number )=> {
      this._timeSeriesRepositoryService.getTimeSeries(`Bearer ${this.shortToken.token}`, "2022-05-01", "2022-05-05", Aggregation.Day, element.meteringPointId).subscribe(
        (data: { result: { success: boolean, MyEnergyData_MarketDocument: MyEnergyDataMarketDocument; }[]; }) => {

          //NU SKAL DET MAPPES TIL GRAPH I STEDET!!!
        this.TimeSeriesRoot.result[index].MyEnergyData_MarketDocument = data.result[0].MyEnergyData_MarketDocument;
        this.TimeSeriesRoot.result[index].success = data.result[0].success;
      });
    });

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
      this.shortLivedToken.date = today.toString();
      this.shortLivedToken.token = data.result;
      this._cookieService.set('shortLived', JSON.stringify(this.shortLivedToken));
    });
  }
}
