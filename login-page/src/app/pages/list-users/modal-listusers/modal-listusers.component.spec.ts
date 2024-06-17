import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListusersComponent } from './modal-listusers.component';

describe('ModalListusersComponent', () => {
  let component: ModalListusersComponent;
  let fixture: ComponentFixture<ModalListusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalListusersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalListusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
