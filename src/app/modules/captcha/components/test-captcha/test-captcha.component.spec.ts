import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaptchaComponent } from './test-captcha.component';

describe('TestCaptchaComponent', () => {
  let component: TestCaptchaComponent;
  let fixture: ComponentFixture<TestCaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCaptchaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
