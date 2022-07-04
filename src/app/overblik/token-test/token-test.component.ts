import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { CookieService } from 'ngx-cookie-service';
import { Aggregation } from 'src/app/models/aggregation';
import { MeteringPointRootObject } from 'src/app/models/metering-points';
import { ShortLivedToken } from 'src/app/models/shortLivedToken';
import { FormGroup, FormControl } from '@angular/forms';
import { TimeSeriesRepositoryService } from 'src/app/services/time-series-repository/time-series-repository.service';
import { token, TokenRepositoryService } from 'src/app/services/token-repositories/token-repository.service';
import { DateRange } from '@angular/material/datepicker';
import { HttpContext, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { DateRangeObject } from 'src/app/models/date-range';
import { BaseChartDirective } from 'ng2-charts';

type ShortTokenObject = {
  token: string;
  date: string;
}

@Component({
  selector: 'app-token-test',
  templateUrl: './token-test.component.html',
  styleUrls: ['./token-test.component.scss']
})
export class TokenTestComponent implements OnInit {

  constructor(private _tokenService: TokenRepositoryService, private _timeSeriesRepositoryService: TimeSeriesRepositoryService, private _cookieService: CookieService){};

  consoleText: string = "";

  auth_token: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJDdXN0b21lckFQSV9SZWZyZXNoIiwidG9rZW5pZCI6IjAyNzc3ZTA2LWYxNmMtNGFjNy1hNGQwLTJkYzQzMjI4N2UxYiIsIndlYkFwcCI6WyJDdXN0b21lckFwaSIsIkN1c3RvbWVyQXBwQXBpIl0sImp0aSI6IjAyNzc3ZTA2LWYxNmMtNGFjNy1hNGQwLTJkYzQzMjI4N2UxYiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiUElEOjkyMDgtMjAwMi0yLTI0ODAyMzQ1NzY4MCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6Ikxhc3NlIFJ1bmUgSGFuc2VuIiwibG9naW5UeXBlIjoiS2V5Q2FyZCIsInBpZCI6IjkyMDgtMjAwMi0yLTI0ODAyMzQ1NzY4MCIsInR5cCI6IlBPQ0VTIiwidXNlcklkIjoiNDIzNDMiLCJleHAiOjE2ODMwNTI1OTcsImlzcyI6IkVuZXJnaW5ldCIsInRva2VuTmFtZSI6IkFuZ3VsYXIiLCJhdWQiOiJFbmVyZ2luZXQifQ.lYGhXT_e3ctieUlpCJZHcFrlfSlNnaZyY5Sd8b3gIZo";
  tempShortToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJDdXN0b21lckFQSV9EYXRhQWNjZXNzIiwidG9rZW5pZCI6IjJkZTgzMzZmLTFjYWUtNGFjZi05YzkyLTQ0OTE3MGZjNTk5NiIsIndlYkFwcCI6WyJDdXN0b21lckFwaSIsIkN1c3RvbWVyQXBpIiwiQ3VzdG9tZXJBcHBBcGkiXSwianRpIjoiMmRlODMzNmYtMWNhZS00YWNmLTljOTItNDQ5MTcwZmM1OTk2IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJQSUQ6OTIwOC0yMDAyLTItMjQ4MDIzNDU3NjgwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiTGFzc2UgUnVuZSBIYW5zZW4iLCJsb2dpblR5cGUiOiJLZXlDYXJkIiwicGlkIjoiOTIwOC0yMDAyLTItMjQ4MDIzNDU3NjgwIiwidHlwIjoiUE9DRVMiLCJ1c2VySWQiOiI0MjM0MyIsImV4cCI6MTY1NTY2MTExOCwiaXNzIjoiRW5lcmdpbmV0IiwidG9rZW5OYW1lIjoiQW5ndWxhciIsImF1ZCI6IkVuZXJnaW5ldCJ9.P5AibYv9n4cSXvZtETfZl8goujyan9YCkkBeWaJM12Y";
  shortToken:token = { result: ""};
  shortTokenObject: string = ""; //ShortTokenObject = {token: "", date: ""};
  meteringPoints: MeteringPointRootObject = { result: [{}, {}] } as MeteringPointRootObject;
  myEnergyData: any[] = [];
  shortLivedDate: Date = new Date;
  shortLivedToken: string = "";
  shortLIvedTOkenObject: ShortLivedToken = new ShortLivedToken();
  shortLivedCookieMissing: boolean = true;

  errorMessage: string = "";

  @Input() startDate: string ="";
  @Input() endDate: string="";

  @Input() dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ngOnInit(): void {
    let shortLivedCookie = this._cookieService.get('shortToken');
    if(shortLivedCookie !== ""){
      this.shortLIvedTOkenObject = JSON.parse(shortLivedCookie);
      this.shortLivedCookieMissing = false;
    }

    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

    this.dateRange.setValue({
      start: firstDay,
      end: new Date
    })

    if(this.shortLivedCookieMissing){
      this._tokenService.getShortLivedToken(this.auth_token)
    .subscribe({
      next: (d) => {this.shortLivedToken = `Bearer ${d.result}`; this._cookieService.set('shortToken', JSON.stringify({token: d.result, date: new Date}));},
      error: (e: any) => {this.handleErrorResponse(e, "There was an error getting the short lived token"); this.updateSpinner()},
      complete: () => {
        console.log("Complete!");
        this.consoleText = "Getting shortLived token is completed succesfully!";
        this.getMeteringPoints();
      }
    });
    }
    else if(this.shortTokenIsFresh(new Date, new Date(this.shortLIvedTOkenObject.date))){
      console.log("Short token is fresh!");
      this.consoleText = "Short token is fresh!";
      let shortLivedCookie: ShortLivedToken = JSON.parse(this._cookieService.get('shortToken'));
      this.shortToken.result = shortLivedCookie.token;
      this.shortLivedToken = `Bearer ${this.shortToken.result}`;
      this.getMeteringPoints();
    }
    else{
      this._tokenService.getShortLivedToken(this.auth_token)
    .subscribe({
      next: (d) => {this.shortLivedToken = `Bearer ${d.result}`; this._cookieService.set('shortToken', JSON.stringify({token: this.shortToken.result, date: new Date}));},
      error: (e: HttpErrorResponse) => {this.handleErrorResponse(e, "There was an error getting the short lived token"); this.updateSpinner();},
            complete: () => {
              this.consoleText = "Getting shortLived token is completed succesfully!";
        this.getMeteringPoints();
      }
    });
    }
  }
  updateSpinner(error: boolean = false) {
    document.getElementById("loader")?.classList.add('hidden');
    document.getElementById("loader")?.classList.remove('loader');
    document.getElementById("loader")?.classList.add('error');

    if ( document.getElementById("loader")?.classList.contains('loader') && error === false) document.getElementById("loader")?.classList.toggle('loader');
    if (error = true) document.getElementById("loader")?.classList.toggle('error');
  }
  handleErrorResponse(e: HttpErrorResponse, callOrigin: string) {
    console.log(callOrigin);
    this.errorMessage = e.message;
    console.log("Status is: " + e.status.valueOf());
    console.log("Status is: " + e.status.toLocaleString());
    console.log("Error is: "+e.error);
    console.log("Error message is: ",+e.message.toString());
    console.log("Type is: "+e.type);
    console.log("Status text is: "+e.statusText);
    console.log(e);
    this.consoleText = callOrigin + '\n' + e.message;
  }

  getTimeSeries() {
    this.meteringPoints.result.forEach((element, index) => {
      let [start] = this.dateRange.get('start')?.value.toISOString().split('T');
      let [end] = this.dateRange.get('end')?.value.toISOString().split('T');

      this._timeSeriesRepositoryService.getTimeSeries(`${this.shortLivedToken}`, start, end, Aggregation.Day, element.meteringPointId)
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
        error: (e) => {this.handleErrorResponse(e, "There was an error getting the Time series"); this.updateSpinner();},
        complete: () => {console.log("Getting the time series was completed succesfully!"); this.updateSpinner();}
      })
    })
  }

  private getMeteringPoints() {
    this._tokenService.getMeteringpoints(`${this.shortLivedToken}`)
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
      error: (e: HttpErrorResponse) => {this.handleErrorResponse(e, "There was an error getting the metering points"); this.updateSpinner();},
      complete: () => {console.log("Getting the metering points completed succesfully, now getting the time series..."); this.getTimeSeries();}

    });
  }

  onUpdateDateRange(dateRange: DateRangeObject){
    this.dateRange.setValue({
      start: dateRange.start,
      end: dateRange.end
    });
    this.getTimeSeries();
  }

  private shortTokenIsFresh(today: Date, tokenDate: Date): boolean {
    let tokenExpirationDate = tokenDate.setDate(tokenDate.getDate() + 1)
    let todayTime = today.getTime();
    if (tokenExpirationDate < todayTime) {

      return false;
    }
    return true;
  }
}

