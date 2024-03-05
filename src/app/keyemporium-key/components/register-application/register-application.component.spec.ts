import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterApplicationComponent } from './register-application.component';

describe('RegisterApplicationComponent', () => {
  let component: RegisterApplicationComponent;
  let fixture: ComponentFixture<RegisterApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
