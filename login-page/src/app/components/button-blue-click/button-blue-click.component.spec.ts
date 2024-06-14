import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBlueClickComponent } from './button-blue-click.component';

describe('ButtonBlueClickComponent', () => {
  let component: ButtonBlueClickComponent;
  let fixture: ComponentFixture<ButtonBlueClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonBlueClickComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonBlueClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
