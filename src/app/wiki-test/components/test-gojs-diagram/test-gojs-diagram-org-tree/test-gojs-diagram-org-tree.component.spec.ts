import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGojsDiagramOrgTreeComponent } from './test-gojs-diagram-org-tree.component';

describe('TestGojsDiagramOrgTreeComponent', () => {
  let component: TestGojsDiagramOrgTreeComponent;
  let fixture: ComponentFixture<TestGojsDiagramOrgTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestGojsDiagramOrgTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestGojsDiagramOrgTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
