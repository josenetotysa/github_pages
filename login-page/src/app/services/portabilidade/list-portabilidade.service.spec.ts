import { TestBed } from '@angular/core/testing';

import { ListPortabilidadeService } from './list-portabilidade.service';

describe('ListPortabilidadeService', () => {
  let service: ListPortabilidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPortabilidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
