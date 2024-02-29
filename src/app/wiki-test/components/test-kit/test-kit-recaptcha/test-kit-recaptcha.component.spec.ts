import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitRecaptchaComponent } from './test-kit-recaptcha.component';

describe('TestKitRecaptchaComponent', () => {
  let component: TestKitRecaptchaComponent;
  let fixture: ComponentFixture<TestKitRecaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestKitRecaptchaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestKitRecaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
