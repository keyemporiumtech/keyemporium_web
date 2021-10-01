import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLayoutComponent } from './test-layout.component';

describe('TestLayoutComponent', () => {
  let component: TestLayoutComponent;
  let fixture: ComponentFixture<TestLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
