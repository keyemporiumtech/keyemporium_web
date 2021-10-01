import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDdcValidationComponent } from './test-ddc-validation.component';

describe('TestDdcValidationComponent', () => {
  let component: TestDdcValidationComponent;
  let fixture: ComponentFixture<TestDdcValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDdcValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDdcValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
