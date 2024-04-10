import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { juryGuard } from './jury.guard';

describe('juryGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => juryGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
