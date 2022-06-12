import { Component, OnInit } from '@angular/core';
import { Aggregation } from 'src/app/models/aggregation';
import { MeteringPointRootObject } from 'src/app/models/metering-points';
import { MyEnergyDataMarketDocument } from 'src/app/models/time-series';
import { TimeSeriesRepositoryService } from 'src/app/services/time-series-repository/time-series-repository.service';
import { token, TokenRepositoryService } from 'src/app/services/token-repositories/token-repository.service';


@Component({
  selector: 'app-token-test',
  templateUrl: './token-test.component.html',
  styleUrls: ['./token-test.component.scss']
})
export class TokenTestComponent implements OnInit {

  constructor(private _tokenService: TokenRepositoryService, private _timeSeriesRepositoryService: TimeSeriesRepositoryService){};

  auth_token: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJDdXN0b21lckFQSV9SZWZyZXNoIiwidG9rZW5pZCI6IjAyNzc3ZTA2LWYxNmMtNGFjNy1hNGQwLTJkYzQzMjI4N2UxYiIsIndlYkFwcCI6WyJDdXN0b21lckFwaSIsIkN1c3RvbWVyQXBwQXBpIl0sImp0aSI6IjAyNzc3ZTA2LWYxNmMtNGFjNy1hNGQwLTJkYzQzMjI4N2UxYiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiUElEOjkyMDgtMjAwMi0yLTI0ODAyMzQ1NzY4MCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6Ikxhc3NlIFJ1bmUgSGFuc2VuIiwibG9naW5UeXBlIjoiS2V5Q2FyZCIsInBpZCI6IjkyMDgtMjAwMi0yLTI0ODAyMzQ1NzY4MCIsInR5cCI6IlBPQ0VTIiwidXNlcklkIjoiNDIzNDMiLCJleHAiOjE2ODMwNTI1OTcsImlzcyI6IkVuZXJnaW5ldCIsInRva2VuTmFtZSI6IkFuZ3VsYXIiLCJhdWQiOiJFbmVyZ2luZXQifQ.lYGhXT_e3ctieUlpCJZHcFrlfSlNnaZyY5Sd8b3gIZo";
  tempShortToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJDdXN0b21lckFQSV9EYXRhQWNjZXNzIiwidG9rZW5pZCI6IjhiNWU0ZDEwLTU5MzAtNDJhYS1iYjNkLTQzZDA3YTM2ODE5MyIsIndlYkFwcCI6WyJDdXN0b21lckFwaSIsIkN1c3RvbWVyQXBpIiwiQ3VzdG9tZXJBcHBBcGkiXSwianRpIjoiOGI1ZTRkMTAtNTkzMC00MmFhLWJiM2QtNDNkMDdhMzY4MTkzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJQSUQ6OTIwOC0yMDAyLTItMjQ4MDIzNDU3NjgwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiTGFzc2UgUnVuZSBIYW5zZW4iLCJsb2dpblR5cGUiOiJLZXlDYXJkIiwicGlkIjoiOTIwOC0yMDAyLTItMjQ4MDIzNDU3NjgwIiwidHlwIjoiUE9DRVMiLCJ1c2VySWQiOiI0MjM0MyIsImV4cCI6MTY1NTEwNTY5MiwiaXNzIjoiRW5lcmdpbmV0IiwidG9rZW5OYW1lIjoiQW5ndWxhciIsImF1ZCI6IkVuZXJnaW5ldCJ9.UQVGGmI7IyYa0UnOQQ2pHhNkpzuXwkAiqJe2ZNf085Y";
  shortToken:token = { result: ""};
  meteringPoints: MeteringPointRootObject = { result: [{}, {}] } as MeteringPointRootObject;
  myEnergyData: any[] = [];

  ngOnInit(): void {

    this._tokenService.getShortLivedTokenTest(this.auth_token)
    .subscribe({
      next: (d) => {this.shortToken = d; console.log(d); console.log(this.shortToken.result);},
      error: (e: any) => {console.log("There was an error!"); console.log(e);},
      complete: () => {console.log("Complete!"); this.getMeteringPoints()}
    })
  }

  getTimeSeries() {
    this.meteringPoints.result.forEach((element, index) => {
      this._timeSeriesRepositoryService.getTimeSeries(`Bearer ${this.tempShortToken}`, "2022-05-01", "2022-06-01", Aggregation.Day, element.meteringPointId)
      .subscribe({
        next: (data) => {
          let points: object[] = [];
          data.result[0].MyEnergyData_MarketDocument.TimeSeries[0].Period.forEach(element => {
            const timeInterval = `${element.timeInterval.start} : ${element.timeInterval.end}`;
            const pointMeasurement: string = element.Point[0]["out_Quantity.quantity"];
             points.push({'timeInterval': timeInterval, 'pointQuantity': pointMeasurement});


          });
          this.myEnergyData.push({'supplier': this.meteringPoints.result[index].balanceSupplierName, 'supplierTimeSeries': [points]})
        },
        error: (e) => console.log(`There was an error getting the time series: ${e}`),
        complete: () => console.log("GEtting the time series was completed succesfully!")
      })
    })
  }

  private getMeteringPoints() {
    this._tokenService.getMeteringpoints(`Bearer ${this.tempShortToken}`)
    .subscribe( {
      next: (data) => {
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
        })
      },
      error: (e) => console.log(`There was an error: ${e}`),
      complete: () => {console.log("Getting the metering points completed succesfully, now getting the time series..."); this.getTimeSeries();}

    });
  }
}
