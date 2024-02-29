import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRecaptchaComponent } from './input-recaptcha.component';

describe('InputRecaptchaComponent', () => {
  let component: InputRecaptchaComponent;
  let fixture: ComponentFixture<InputRecaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputRecaptchaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputRecaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
