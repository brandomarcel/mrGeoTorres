import { TestBed } from '@angular/core/testing';

import { RolestecnicoGuard } from './rolestecnico.guard';

describe('RolestecnicoGuard', () => {
  let guard: RolestecnicoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolestecnicoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
