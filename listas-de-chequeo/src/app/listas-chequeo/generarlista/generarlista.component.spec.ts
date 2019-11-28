import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarlistaComponent } from './generarlista.component';

describe('GenerarlistaComponent', () => {
  let component: GenerarlistaComponent;
  let fixture: ComponentFixture<GenerarlistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarlistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarlistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
