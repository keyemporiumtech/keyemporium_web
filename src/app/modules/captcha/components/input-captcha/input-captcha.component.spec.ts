import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCaptchaComponent } from './input-captcha.component';

describe('InputCaptchaComponent', () => {
  let component: InputCaptchaComponent;
  let fixture: ComponentFixture<InputCaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCaptchaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
