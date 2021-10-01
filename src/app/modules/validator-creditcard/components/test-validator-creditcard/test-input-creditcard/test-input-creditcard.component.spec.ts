import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputCreditcardComponent } from './test-input-creditcard.component';

describe('TestInputCreditcardComponent', () => {
  let component: TestInputCreditcardComponent;
  let fixture: ComponentFixture<TestInputCreditcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInputCreditcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInputCreditcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
