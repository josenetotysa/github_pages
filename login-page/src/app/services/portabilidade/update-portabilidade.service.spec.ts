import { TestBed } from '@angular/core/testing';

import { UpdatePortabilidadeService } from './update-portabilidade.service';

describe('UpdateOperadoraService', () => {
  let service: UpdatePortabilidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatePortabilidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
