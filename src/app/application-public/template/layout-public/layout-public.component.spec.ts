import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPublicComponent } from './layout-public.component';

describe('LayoutPublicComponent', () => {
  let component: LayoutPublicComponent;
  let fixture: ComponentFixture<LayoutPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
