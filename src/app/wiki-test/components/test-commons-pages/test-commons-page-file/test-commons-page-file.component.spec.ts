import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCommonsPageFileComponent } from './test-commons-page-file.component';

describe('TestCommonsPageFileComponent', () => {
  let component: TestCommonsPageFileComponent;
  let fixture: ComponentFixture<TestCommonsPageFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCommonsPageFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCommonsPageFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
