import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGojsDiagramUmlComponent } from './test-gojs-diagram-uml.component';

describe('TestGojsDiagramUmlComponent', () => {
  let component: TestGojsDiagramUmlComponent;
  let fixture: ComponentFixture<TestGojsDiagramUmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestGojsDiagramUmlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestGojsDiagramUmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
