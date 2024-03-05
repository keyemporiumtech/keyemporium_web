import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutKeyComponent } from './layout-key.component';

describe('LayoutKeyComponent', () => {
  let component: LayoutKeyComponent;
  let fixture: ComponentFixture<LayoutKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutKeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
