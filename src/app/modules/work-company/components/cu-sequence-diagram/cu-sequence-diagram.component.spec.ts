import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuSequenceDiagramComponent } from './cu-sequence-diagram.component';

describe('CuSequenceDiagramComponent', () => {
  let component: CuSequenceDiagramComponent;
  let fixture: ComponentFixture<CuSequenceDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuSequenceDiagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuSequenceDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
