import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAuth2faComponent } from './test-auth2fa.component';

describe('TestAuth2faComponent', () => {
  let component: TestAuth2faComponent;
  let fixture: ComponentFixture<TestAuth2faComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAuth2faComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAuth2faComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
