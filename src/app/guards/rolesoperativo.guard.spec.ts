import { TestBed } from '@angular/core/testing';

import { RolesoperativoGuard } from './rolesoperativo.guard';

describe('RolesoperativoGuard', () => {
  let guard: RolesoperativoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolesoperativoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
