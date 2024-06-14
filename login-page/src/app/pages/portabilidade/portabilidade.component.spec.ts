import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortabilidadeComponent } from './portabilidade.component';

describe('PortabilidadeComponent', () => {
  let component: PortabilidadeComponent;
  let fixture: ComponentFixture<PortabilidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortabilidadeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PortabilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
