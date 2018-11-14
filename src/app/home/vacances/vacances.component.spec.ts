import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancesComponent } from './vacances.component';

describe('VacancesComponent', () => {
  let component: VacancesComponent;
  let fixture: ComponentFixture<VacancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
