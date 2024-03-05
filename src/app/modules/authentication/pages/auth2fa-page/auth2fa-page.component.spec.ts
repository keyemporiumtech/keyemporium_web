import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth2faPageComponent } from './auth2fa-page.component';

describe('Auth2faPageComponent', () => {
  let component: Auth2faPageComponent;
  let fixture: ComponentFixture<Auth2faPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth2faPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Auth2faPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
