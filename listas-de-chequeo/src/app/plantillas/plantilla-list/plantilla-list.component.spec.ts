import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaListComponent } from './plantilla-list.component';

describe('PlantillaListComponent', () => {
  let component: PlantillaListComponent;
  let fixture: ComponentFixture<PlantillaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
