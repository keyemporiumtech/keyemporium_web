import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModulesComponent } from './test-modules.component';

describe('TestModulesComponent', () => {
  let component: TestModulesComponent;
  let fixture: ComponentFixture<TestModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestModulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
