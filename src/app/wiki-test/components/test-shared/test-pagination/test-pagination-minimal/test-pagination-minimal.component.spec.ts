import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPaginationMinimalComponent } from './test-pagination-minimal.component';

describe('TestPaginationMinimalComponent', () => {
  let component: TestPaginationMinimalComponent;
  let fixture: ComponentFixture<TestPaginationMinimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPaginationMinimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPaginationMinimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
