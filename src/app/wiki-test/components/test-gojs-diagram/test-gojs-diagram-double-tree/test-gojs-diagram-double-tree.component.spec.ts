import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGojsDiagramDoubleTreeComponent } from './test-gojs-diagram-double-tree.component';

describe('TestGojsDiagramDoubleTreeComponent', () => {
  let component: TestGojsDiagramDoubleTreeComponent;
  let fixture: ComponentFixture<TestGojsDiagramDoubleTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestGojsDiagramDoubleTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestGojsDiagramDoubleTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
