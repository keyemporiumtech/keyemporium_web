import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProfilesComponent } from './test-profiles.component';

describe('TestProfilesComponent', () => {
  let component: TestProfilesComponent;
  let fixture: ComponentFixture<TestProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
