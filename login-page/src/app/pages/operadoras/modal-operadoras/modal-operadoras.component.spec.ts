import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOperadorasComponent } from './modal-operadoras.component';

describe('ModalOperadorasComponent', () => {
  let component: ModalOperadorasComponent;
  let fixture: ComponentFixture<ModalOperadorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOperadorasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalOperadorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
