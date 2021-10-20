import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiePageComponent } from './cookie-page.component';

describe('CookiePageComponent', () => {
  let component: CookiePageComponent;
  let fixture: ComponentFixture<CookiePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookiePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
