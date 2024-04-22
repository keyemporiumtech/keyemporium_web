import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GojsDiagramCommonBtnComponent } from './gojs-diagram-common-btn.component';

describe('GojsDiagramCommonBtnComponent', () => {
  let component: GojsDiagramCommonBtnComponent;
  let fixture: ComponentFixture<GojsDiagramCommonBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GojsDiagramCommonBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GojsDiagramCommonBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
