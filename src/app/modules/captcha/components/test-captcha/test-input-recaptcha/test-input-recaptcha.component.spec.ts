import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputRecaptchaComponent } from './test-input-recaptcha.component';

describe('TestInputRecaptchaComponent', () => {
  let component: TestInputRecaptchaComponent;
  let fixture: ComponentFixture<TestInputRecaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestInputRecaptchaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestInputRecaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
