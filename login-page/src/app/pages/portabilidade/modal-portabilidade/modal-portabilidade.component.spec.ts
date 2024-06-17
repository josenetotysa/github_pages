import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPortabilidadeComponent } from './modal-portabilidade.component';

describe('ModalPortabilidadeComponent', () => {
  let component: ModalPortabilidadeComponent;
  let fixture: ComponentFixture<ModalPortabilidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPortabilidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPortabilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
