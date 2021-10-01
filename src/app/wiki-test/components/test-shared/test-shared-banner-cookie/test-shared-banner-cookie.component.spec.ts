import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSharedBannerCookieComponent } from './test-shared-banner-cookie.component';

describe('TestSharedBannerCookieComponent', () => {
  let component: TestSharedBannerCookieComponent;
  let fixture: ComponentFixture<TestSharedBannerCookieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSharedBannerCookieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSharedBannerCookieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
