import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginApplicationComponent } from './login-application.component';

describe('LoginApplicationComponent', () => {
  let component: LoginApplicationComponent;
  let fixture: ComponentFixture<LoginApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
