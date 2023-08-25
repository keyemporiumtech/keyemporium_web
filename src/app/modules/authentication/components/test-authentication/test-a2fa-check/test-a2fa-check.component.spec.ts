import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestA2faCheckComponent } from './test-a2fa-check.component';

describe('TestA2faCheckComponent', () => {
  let component: TestA2faCheckComponent;
  let fixture: ComponentFixture<TestA2faCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestA2faCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestA2faCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
