import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRestOauthLoginComponent } from './test-rest-oauth-login.component';

describe('TestRestOauthLoginComponent', () => {
  let component: TestRestOauthLoginComponent;
  let fixture: ComponentFixture<TestRestOauthLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRestOauthLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRestOauthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
