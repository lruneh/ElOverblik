import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenResultat } from 'src/app/models/token';
import { MeteringPoint } from 'src/app/models/metering-point';
import { MeteringPointRootObject } from 'src/app/models/metering-points';

@Injectable({
  providedIn: 'root'
})
export class TokenRepositoryService {

  auth_token: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJDdXN0b21lckFQSV9SZWZyZXNoIiwidG9rZW5pZCI6IjAyNzc3ZTA2LWYxNmMtNGFjNy1hNGQwLTJkYzQzMjI4N2UxYiIsIndlYkFwcCI6WyJDdXN0b21lckFwaSIsIkN1c3RvbWVyQXBwQXBpIl0sImp0aSI6IjAyNzc3ZTA2LWYxNmMtNGFjNy1hNGQwLTJkYzQzMjI4N2UxYiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiUElEOjkyMDgtMjAwMi0yLTI0ODAyMzQ1NzY4MCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6Ikxhc3NlIFJ1bmUgSGFuc2VuIiwibG9naW5UeXBlIjoiS2V5Q2FyZCIsInBpZCI6IjkyMDgtMjAwMi0yLTI0ODAyMzQ1NzY4MCIsInR5cCI6IlBPQ0VTIiwidXNlcklkIjoiNDIzNDMiLCJleHAiOjE2ODMwNTI1OTcsImlzcyI6IkVuZXJnaW5ldCIsInRva2VuTmFtZSI6IkFuZ3VsYXIiLCJhdWQiOiJFbmVyZ2luZXQifQ.lYGhXT_e3ctieUlpCJZHcFrlfSlNnaZyY5Sd8b3gIZo";
  refresh_token: any;
  private apiUrl = 'https://api.eloverblik.dk/customerapi/api/token';
  private meteringPointUrl = 'https://api.eloverblik.dk/customerapi/api/meteringpoints/meteringpoints';
  resultToken: string = "";

  constructor(private httpClient: HttpClient) { }

  public getShortLivedToken(token: string): Observable<TokenResultat> {
    return this.httpClient
      .get<TokenResultat>(this.apiUrl, {
        headers: { 'Authorization': token, 'accept': 'application/json' }
      });
  }

  public getMeteringpoints(token: string): Observable<MeteringPointRootObject> {
    let meteringPoints = this.httpClient
      .get<MeteringPointRootObject>(this.meteringPointUrl, {
        headers: { 'Authorization': token, 'accept': 'application/json' }
      });

      return meteringPoints;
  }
}
