import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchaKeyComponent } from './captcha-key.component';

describe('CaptchaKeyComponent', () => {
  let component: CaptchaKeyComponent;
  let fixture: ComponentFixture<CaptchaKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptchaKeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptchaKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
