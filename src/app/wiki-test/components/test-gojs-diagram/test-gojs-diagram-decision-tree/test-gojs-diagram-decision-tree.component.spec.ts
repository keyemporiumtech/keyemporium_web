import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGojsDiagramDecisionTreeComponent } from './test-gojs-diagram-decision-tree.component';

describe('TestGojsDiagramDecisionTreeComponent', () => {
  let component: TestGojsDiagramDecisionTreeComponent;
  let fixture: ComponentFixture<TestGojsDiagramDecisionTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestGojsDiagramDecisionTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestGojsDiagramDecisionTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
