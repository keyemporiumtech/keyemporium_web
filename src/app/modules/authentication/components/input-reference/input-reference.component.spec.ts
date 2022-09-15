import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputReferenceComponent } from './input-reference.component';

describe('InputReferenceComponent', () => {
  let component: InputReferenceComponent;
  let fixture: ComponentFixture<InputReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
