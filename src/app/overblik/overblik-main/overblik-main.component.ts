import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { MeteringPoint } from 'src/app/models/metering-point';
import { TokenRepositoryService } from 'src/app/services/token-repositories/token-repository.service';


@Component({
  selector: 'app-overblik-main',
  templateUrl: './overblik-main.component.html',
  styleUrls: ['./overblik-main.component.scss']
})
export class OverblikMainComponent implements OnInit {

  title: string = "Overblik Main";
  value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJDdXN0b21lckFQSV9SZWZyZXNoIiwidG9rZW5pZCI6IjAyNzc3ZTA2LWYxNmMtNGFjNy1hNGQwLTJkYzQzMjI4N2UxYiIsIndlYkFwcCI6WyJDdXN0b21lckFwaSIsIkN1c3RvbWVyQXBwQXBpIl0sImp0aSI6IjAyNzc3ZTA2LWYxNmMtNGFjNy1hNGQwLTJkYzQzMjI4N2UxYiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiUElEOjkyMDgtMjAwMi0yLTI0ODAyMzQ1NzY4MCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6Ikxhc3NlIFJ1bmUgSGFuc2VuIiwibG9naW5UeXBlIjoiS2V5Q2FyZCIsInBpZCI6IjkyMDgtMjAwMi0yLTI0ODAyMzQ1NzY4MCIsInR5cCI6IlBPQ0VTIiwidXNlcklkIjoiNDIzNDMiLCJleHAiOjE2ODMwNTI1OTcsImlzcyI6IkVuZXJnaW5ldCIsInRva2VuTmFtZSI6IkFuZ3VsYXIiLCJhdWQiOiJFbmVyZ2luZXQifQ.lYGhXT_e3ctieUlpCJZHcFrlfSlNnaZyY5Sd8b3gIZo';
  shortLivedToken = 'Bearer';
  metoringPoints: MeteringPoint[] = [];
  constructor(private _tokenService: TokenRepositoryService) { }


  test: any;
  ngOnInit(): void {
  }

  registerClick(value: string) {
    value = `Bearer ${value}`;
    if (!this.shortLivedToken) {
      this._tokenService.getShortLivedToken(value).subscribe((data: { result: string; }) => {
        this.shortLivedToken = data.result;
      });
    }

    this.shortLivedToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJDdXN0b21lckFQSV9EYXRhQWNjZXNzIiwidG9rZW5pZCI6IjA1YTlkM2U4LTkxNzAtNGEyMi05NTRkLTZiZmRiZDM5NWRkMyIsIndlYkFwcCI6WyJDdXN0b21lckFwaSIsIkN1c3RvbWVyQXBpIiwiQ3VzdG9tZXJBcHBBcGkiXSwianRpIjoiMDVhOWQzZTgtOTE3MC00YTIyLTk1NGQtNmJmZGJkMzk1ZGQzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJQSUQ6OTIwOC0yMDAyLTItMjQ4MDIzNDU3NjgwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiTGFzc2UgUnVuZSBIYW5zZW4iLCJsb2dpblR5cGUiOiJLZXlDYXJkIiwicGlkIjoiOTIwOC0yMDAyLTItMjQ4MDIzNDU3NjgwIiwidHlwIjoiUE9DRVMiLCJ1c2VySWQiOiI0MjM0MyIsImV4cCI6MTY1MjEyMTU2OCwiaXNzIjoiRW5lcmdpbmV0IiwidG9rZW5OYW1lIjoiQW5ndWxhciIsImF1ZCI6IkVuZXJnaW5ldCJ9.KokfB--Auwkpk_KBnLz2k4xBhgC-qAhmdmT-QtDPMqU";

    if (this.shortLivedToken){
      this._tokenService.getMeteringpoints(this.shortLivedToken).subscribe((data) => {
        this.metoringPoints = data;
      });
    }

    this.test = this.metoringPoints;
  }
}
