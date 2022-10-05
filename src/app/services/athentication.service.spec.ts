import { TestBed } from '@angular/core/testing';

import { AthenticationService } from './athentication.service';

describe('AthenticationService', () => {
  let service: AthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
