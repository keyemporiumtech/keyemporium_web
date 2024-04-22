import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSharedAuth2faPageComponent } from './test-shared-auth2fa-page.component';

describe('TestSharedAuth2faPageComponent', () => {
  let component: TestSharedAuth2faPageComponent;
  let fixture: ComponentFixture<TestSharedAuth2faPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSharedAuth2faPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSharedAuth2faPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
