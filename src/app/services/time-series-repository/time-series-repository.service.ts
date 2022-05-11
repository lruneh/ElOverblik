import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeSeriesRoot } from 'src/app/models/time-series';
import { Aggregation } from 'src/app/models/aggregation';

@Injectable({
  providedIn: 'root'
})
export class TimeSeriesRepositoryService {
  private apiUrl = 'https://api.eloverblik.dk/customerapi/api/meterdata/gettimeseries';

  constructor(private httpClient: HttpClient) { }

  public getTimeSeries(token: string, dateFrom: string, DateTo: string, aggregation: Aggregation, meteringPoint: string) {
    const body = `{
      "meteringPoints": {
        "meteringPoint": [
          ${meteringPoint}
        ]
      }
    }`
    return this.httpClient
      .post<TimeSeriesRoot>(`${this.apiUrl}/${dateFrom}/${DateTo}/${aggregation}/`, body, { headers: { 'Authorization': token, 'accept': 'application/json', 'Content-type': 'application/json' } }
      )
  }
}
