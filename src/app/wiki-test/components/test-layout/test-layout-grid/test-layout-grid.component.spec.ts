import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLayoutGridComponent } from './test-layout-grid.component';

describe('TestLayoutGridComponent', () => {
  let component: TestLayoutGridComponent;
  let fixture: ComponentFixture<TestLayoutGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestLayoutGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLayoutGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
