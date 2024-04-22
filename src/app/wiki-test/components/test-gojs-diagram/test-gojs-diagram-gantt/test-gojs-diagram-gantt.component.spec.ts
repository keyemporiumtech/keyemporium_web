import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGojsDiagramGanttComponent } from './test-gojs-diagram-gantt.component';

describe('TestGojsDiagramGanttComponent', () => {
  let component: TestGojsDiagramGanttComponent;
  let fixture: ComponentFixture<TestGojsDiagramGanttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestGojsDiagramGanttComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestGojsDiagramGanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
