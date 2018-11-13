import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBlackComponent } from './create-black.component';

describe('CreateBlackComponent', () => {
  let component: CreateBlackComponent;
  let fixture: ComponentFixture<CreateBlackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBlackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
