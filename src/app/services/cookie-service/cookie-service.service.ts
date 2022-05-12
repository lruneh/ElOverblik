import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieServiceService {

  private shortTokenCookie = '';
  private refreshTokenCookie = '';
  private all_cookies: any = '';

  constructor(private cookieService: CookieService) {

  }

  setCookie(cookie: string, value: string) {
    this.cookieService.set(cookie, value);
  }

  deleteCookie() {
    this.cookieService.delete('name');
  }

  deleteAll() {
    this.cookieService.deleteAll();
  }

  ngOnInit(): void {
    this.shortTokenCookie = this.cookieService.get('shortToken');
    this.refreshTokenCookie = this.cookieService.get('refreshToken');
    this.all_cookies = this.cookieService.getAll();  // get all cookies object
  }
}
