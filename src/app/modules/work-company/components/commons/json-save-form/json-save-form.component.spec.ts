import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonSaveFormComponent } from './json-save-form.component';

describe('JsonSaveFormComponent', () => {
  let component: JsonSaveFormComponent;
  let fixture: ComponentFixture<JsonSaveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonSaveFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonSaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
