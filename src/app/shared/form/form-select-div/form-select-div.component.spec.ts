import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectDivComponent } from './form-select-div.component';

describe('FormSelectDivComponent', () => {
  let component: FormSelectDivComponent;
  let fixture: ComponentFixture<FormSelectDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSelectDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSelectDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
