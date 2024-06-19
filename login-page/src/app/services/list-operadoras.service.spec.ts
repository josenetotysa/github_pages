import { TestBed } from '@angular/core/testing';

import { ListOperadorasService } from './list-operadoras.service';

describe('ListOperadorasService', () => {
  let service: ListOperadorasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOperadorasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
