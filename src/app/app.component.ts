import { Component } from '@angular/core';
import 'reflect-metadata';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hello world from ElOverblik!';

  constructor(private cookieService: CookieService) {
  }

}
