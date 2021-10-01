import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLayoutColorsComponent } from './test-layout-colors.component';

describe('TestLayoutColorsComponent', () => {
  let component: TestLayoutColorsComponent;
  let fixture: ComponentFixture<TestLayoutColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestLayoutColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLayoutColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
