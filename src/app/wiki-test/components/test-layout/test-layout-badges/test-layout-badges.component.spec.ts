import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLayoutBadgesComponent } from './test-layout-badges.component';

describe('TestLayoutBadgesComponent', () => {
  let component: TestLayoutBadgesComponent;
  let fixture: ComponentFixture<TestLayoutBadgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestLayoutBadgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLayoutBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
