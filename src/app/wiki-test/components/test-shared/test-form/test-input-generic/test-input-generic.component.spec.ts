import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputGenericComponent } from './test-input-generic.component';

describe('TestInputGenericComponent', () => {
  let component: TestInputGenericComponent;
  let fixture: ComponentFixture<TestInputGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInputGenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInputGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
