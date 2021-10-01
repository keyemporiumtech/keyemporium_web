import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAppLanguagesComponent } from './test-app-languages.component';

describe('TestAppLanguagesComponent', () => {
  let component: TestAppLanguagesComponent;
  let fixture: ComponentFixture<TestAppLanguagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAppLanguagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAppLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
