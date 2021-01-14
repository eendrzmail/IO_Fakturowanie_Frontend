import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakturaEditComponent } from './faktura-edit.component';

describe('FakturaEditComponent', () => {
  let component: FakturaEditComponent;
  let fixture: ComponentFixture<FakturaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakturaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakturaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
