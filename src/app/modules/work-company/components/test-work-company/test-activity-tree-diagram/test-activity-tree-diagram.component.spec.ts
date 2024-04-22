import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestActivityTreeDiagramComponent } from './test-activity-tree-diagram.component';

describe('TestActivityTreeDiagramComponent', () => {
  let component: TestActivityTreeDiagramComponent;
  let fixture: ComponentFixture<TestActivityTreeDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestActivityTreeDiagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestActivityTreeDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
