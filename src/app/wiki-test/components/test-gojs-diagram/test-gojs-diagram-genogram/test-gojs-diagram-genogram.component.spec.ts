import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGojsDiagramGenogramComponent } from './test-gojs-diagram-genogram.component';

describe('TestGojsDiagramGenogramComponent', () => {
  let component: TestGojsDiagramGenogramComponent;
  let fixture: ComponentFixture<TestGojsDiagramGenogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestGojsDiagramGenogramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestGojsDiagramGenogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
