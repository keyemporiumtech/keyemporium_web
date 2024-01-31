import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGojsDiagramFlowchartComponent } from './test-gojs-diagram-flowchart.component';

describe('TestGojsDiagramFlowchartComponent', () => {
  let component: TestGojsDiagramFlowchartComponent;
  let fixture: ComponentFixture<TestGojsDiagramFlowchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestGojsDiagramFlowchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestGojsDiagramFlowchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
