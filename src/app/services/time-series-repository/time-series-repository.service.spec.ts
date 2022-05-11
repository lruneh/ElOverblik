import { TestBed } from '@angular/core/testing';

import { TimeSeriesRepositoryService } from './time-series-repository.service';

describe('TimeSeriesRepositoryService', () => {
  let service: TimeSeriesRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeSeriesRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
