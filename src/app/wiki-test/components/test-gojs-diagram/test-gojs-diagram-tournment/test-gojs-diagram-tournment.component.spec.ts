import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGojsDiagramTournmentComponent } from './test-gojs-diagram-tournment.component';

describe('TestGojsDiagramTournmentComponent', () => {
  let component: TestGojsDiagramTournmentComponent;
  let fixture: ComponentFixture<TestGojsDiagramTournmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestGojsDiagramTournmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestGojsDiagramTournmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
