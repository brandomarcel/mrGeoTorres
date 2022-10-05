import { TestBed } from '@angular/core/testing';

import { RolesusuarioGuard } from './rolesusuario.guard';

describe('RolesusuarioGuard', () => {
  let guard: RolesusuarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolesusuarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
