import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGojsDiagramComponent } from './test-gojs-diagram.component';

describe('TestGojsDiagramComponent', () => {
  let component: TestGojsDiagramComponent;
  let fixture: ComponentFixture<TestGojsDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestGojsDiagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestGojsDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
