import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGanttDiagramComponent } from './task-gantt-diagram.component';

describe('TaskGanttDiagramComponent', () => {
  let component: TaskGanttDiagramComponent;
  let fixture: ComponentFixture<TaskGanttDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskGanttDiagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskGanttDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
