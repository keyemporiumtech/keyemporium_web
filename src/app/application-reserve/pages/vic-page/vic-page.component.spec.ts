import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VicPageComponent } from './vic-page.component';

describe('VicPageComponent', () => {
  let component: VicPageComponent;
  let fixture: ComponentFixture<VicPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VicPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
