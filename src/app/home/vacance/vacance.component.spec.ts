import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanceComponent } from './vacance.component';

describe('VacanceComponent', () => {
  let component: VacanceComponent;
  let fixture: ComponentFixture<VacanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
