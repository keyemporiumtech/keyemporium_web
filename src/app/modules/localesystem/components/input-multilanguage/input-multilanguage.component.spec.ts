import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMultilanguageComponent } from './input-multilanguage.component';

describe('InputMultilanguageComponent', () => {
  let component: InputMultilanguageComponent;
  let fixture: ComponentFixture<InputMultilanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputMultilanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMultilanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
