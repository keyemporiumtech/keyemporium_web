import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTreeDiagramComponent } from './activity-tree-diagram.component';

describe('ActivityTreeDiagramComponent', () => {
  let component: ActivityTreeDiagramComponent;
  let fixture: ComponentFixture<ActivityTreeDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTreeDiagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTreeDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
