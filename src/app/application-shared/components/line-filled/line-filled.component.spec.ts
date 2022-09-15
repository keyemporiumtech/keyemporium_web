import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineFilledComponent } from './line-filled.component';

describe('LineFilledComponent', () => {
  let component: LineFilledComponent;
  let fixture: ComponentFixture<LineFilledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineFilledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineFilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
