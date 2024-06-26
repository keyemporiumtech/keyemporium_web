import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmlComponent } from './uml.component';

describe('UmlComponent', () => {
  let component: UmlComponent;
  let fixture: ComponentFixture<UmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UmlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
