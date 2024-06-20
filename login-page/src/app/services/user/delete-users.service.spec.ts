import { TestBed } from '@angular/core/testing';

import { DeleteUsersService } from './delete-users.service';

describe('DeleteUsersService', () => {
  let service: DeleteUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
