import { TestBed } from '@angular/core/testing';

import { TokenRepositoryService } from './token-repository.service';

describe('GetShortLivedTokenService', () => {
  let service: TokenRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
