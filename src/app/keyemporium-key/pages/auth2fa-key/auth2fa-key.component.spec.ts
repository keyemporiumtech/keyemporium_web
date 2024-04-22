import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth2faKeyComponent } from './auth2fa-key.component';

describe('Auth2faKeyComponent', () => {
  let component: Auth2faKeyComponent;
  let fixture: ComponentFixture<Auth2faKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth2faKeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Auth2faKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
