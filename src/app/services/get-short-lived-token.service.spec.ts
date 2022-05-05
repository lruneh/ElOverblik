import { TestBed } from '@angular/core/testing';

import { GetShortLivedTokenService } from './get-short-lived-token.service';

describe('GetShortLivedTokenService', () => {
  let service: GetShortLivedTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetShortLivedTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
