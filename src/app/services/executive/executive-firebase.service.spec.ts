import { TestBed } from '@angular/core/testing';

import { ExecutiveFirebaseService } from './executive-firebase.service';

describe('ExecutiveFirebaseService', () => {
  let service: ExecutiveFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutiveFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
