import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderKeyComponent } from './header-key.component';

describe('HeaderKeyComponent', () => {
  let component: HeaderKeyComponent;
  let fixture: ComponentFixture<HeaderKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderKeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
