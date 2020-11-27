import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakturaAddComponent } from './faktura-add.component';

describe('FakturaAddComponent', () => {
  let component: FakturaAddComponent;
  let fixture: ComponentFixture<FakturaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakturaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakturaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
