import { TestBed } from '@angular/core/testing';

import { NotAuthguardService } from './not-authguard.service';

describe('NotAuthguardService', () => {
  let service: NotAuthguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotAuthguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
