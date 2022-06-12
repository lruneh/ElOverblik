import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

}
