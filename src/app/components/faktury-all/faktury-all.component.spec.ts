import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakturyAllComponent } from './faktury-all.component';

describe('FakturyAllComponent', () => {
  let component: FakturyAllComponent;
  let fixture: ComponentFixture<FakturyAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakturyAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakturyAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
