import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterKeyComponent } from './footer-key.component';

describe('FooterKeyComponent', () => {
  let component: FooterKeyComponent;
  let fixture: ComponentFixture<FooterKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterKeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
