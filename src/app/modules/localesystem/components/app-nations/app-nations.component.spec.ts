import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNationsComponent } from './app-nations.component';

describe('AppNationsComponent', () => {
  let component: AppNationsComponent;
  let fixture: ComponentFixture<AppNationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppNationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
