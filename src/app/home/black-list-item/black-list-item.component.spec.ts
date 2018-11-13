import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackListItemComponent } from './black-list-item.component';

describe('BlackListItemComponent', () => {
  let component: BlackListItemComponent;
  let fixture: ComponentFixture<BlackListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlackListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
