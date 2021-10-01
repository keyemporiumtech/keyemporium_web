import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPaginationSimpleComponent } from './test-pagination-simple.component';

describe('TestPaginationSimpleComponent', () => {
  let component: TestPaginationSimpleComponent;
  let fixture: ComponentFixture<TestPaginationSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPaginationSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPaginationSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
