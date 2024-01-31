import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitChatbotComponent } from './test-kit-chatbot.component';

describe('TestKitChatbotComponent', () => {
  let component: TestKitChatbotComponent;
  let fixture: ComponentFixture<TestKitChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestKitChatbotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestKitChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
