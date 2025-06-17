import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { navAuthGuard } from './nav-auth-guard';

describe('navAuthGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => navAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
