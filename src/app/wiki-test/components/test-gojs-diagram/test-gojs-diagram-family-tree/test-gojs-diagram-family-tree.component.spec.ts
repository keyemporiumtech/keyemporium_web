import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGojsDiagramFamilyTreeComponent } from './test-gojs-diagram-family-tree.component';

describe('TestGojsDiagramFamilyTreeComponent', () => {
  let component: TestGojsDiagramFamilyTreeComponent;
  let fixture: ComponentFixture<TestGojsDiagramFamilyTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestGojsDiagramFamilyTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestGojsDiagramFamilyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
