import { TestBed } from '@angular/core/testing';

import { UpdateOperadorasService } from './update-operadoras.service';

describe('UpdateOperadoraService', () => {
  let service: UpdateOperadorasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateOperadorasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
