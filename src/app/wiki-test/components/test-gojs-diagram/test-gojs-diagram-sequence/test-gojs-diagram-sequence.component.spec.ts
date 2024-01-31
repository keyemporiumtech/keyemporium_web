import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGojsDiagramSequenceComponent } from './test-gojs-diagram-sequence.component';

describe('TestGojsDiagramSequenceComponent', () => {
  let component: TestGojsDiagramSequenceComponent;
  let fixture: ComponentFixture<TestGojsDiagramSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestGojsDiagramSequenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestGojsDiagramSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
