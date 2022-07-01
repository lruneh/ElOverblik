import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-konsol',
  templateUrl: './konsol.component.html',
  styleUrls: ['./konsol.component.scss']
})
export class KonsolComponent implements OnInit {

  constructor() { }

  @Input() consoleText: Observable<string> = of("");
  ngOnInit(): void {
  }

}
