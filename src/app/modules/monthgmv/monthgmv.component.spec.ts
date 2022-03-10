import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthgmvComponent } from './monthgmv.component';

describe('MonthgmvComponent', () => {
  let component: MonthgmvComponent;
  let fixture: ComponentFixture<MonthgmvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthgmvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthgmvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
