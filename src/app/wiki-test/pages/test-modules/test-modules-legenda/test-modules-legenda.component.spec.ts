import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModulesLegendaComponent } from './test-modules-legenda.component';

describe('TestModulesLegendaComponent', () => {
  let component: TestModulesLegendaComponent;
  let fixture: ComponentFixture<TestModulesLegendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestModulesLegendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestModulesLegendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
