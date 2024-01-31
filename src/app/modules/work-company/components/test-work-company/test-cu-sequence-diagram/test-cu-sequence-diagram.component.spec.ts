import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCuSequenceDiagramComponent } from './test-cu-sequence-diagram.component';

describe('TestCuSequenceDiagramComponent', () => {
  let component: TestCuSequenceDiagramComponent;
  let fixture: ComponentFixture<TestCuSequenceDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCuSequenceDiagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCuSequenceDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
