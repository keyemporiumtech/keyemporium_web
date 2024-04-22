import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputCaptchaComponent } from './test-input-captcha.component';

describe('TestInputCaptchaComponent', () => {
  let component: TestInputCaptchaComponent;
  let fixture: ComponentFixture<TestInputCaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestInputCaptchaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestInputCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
