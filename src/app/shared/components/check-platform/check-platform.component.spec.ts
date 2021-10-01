import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPlatformComponent } from './check-platform.component';

describe('CheckPlatformComponent', () => {
  let component: CheckPlatformComponent;
  let fixture: ComponentFixture<CheckPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
