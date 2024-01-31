import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTaskGanttDiagramComponent } from './test-task-gantt-diagram.component';

describe('TestTaskGanttDiagramComponent', () => {
  let component: TestTaskGanttDiagramComponent;
  let fixture: ComponentFixture<TestTaskGanttDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTaskGanttDiagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTaskGanttDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
