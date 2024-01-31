import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGojsDiagramKanbanBoardComponent } from './test-gojs-diagram-kanban-board.component';

describe('TestGojsDiagramKanbanBoardComponent', () => {
  let component: TestGojsDiagramKanbanBoardComponent;
  let fixture: ComponentFixture<TestGojsDiagramKanbanBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestGojsDiagramKanbanBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestGojsDiagramKanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
