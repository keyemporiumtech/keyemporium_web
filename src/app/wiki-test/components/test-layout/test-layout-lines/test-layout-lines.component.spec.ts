import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLayoutLinesComponent } from './test-layout-lines.component';

describe('TestLayoutLinesComponent', () => {
  let component: TestLayoutLinesComponent;
  let fixture: ComponentFixture<TestLayoutLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestLayoutLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLayoutLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
