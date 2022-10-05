import { TestBed } from '@angular/core/testing';

import { AdminoperaGuard } from './adminopera.guard';

describe('AdminoperaGuard', () => {
  let guard: AdminoperaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminoperaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
