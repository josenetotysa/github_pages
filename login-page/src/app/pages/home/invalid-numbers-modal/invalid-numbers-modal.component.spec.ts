import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidNumbersModalComponent } from './invalid-numbers-modal.component';

describe('InvalidNumbersModalComponent', () => {
  let component: InvalidNumbersModalComponent;
  let fixture: ComponentFixture<InvalidNumbersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidNumbersModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvalidNumbersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
