import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTreeMakerComponent } from './activity-tree-maker.component';

describe('ActivityTreeMakerComponent', () => {
  let component: ActivityTreeMakerComponent;
  let fixture: ComponentFixture<ActivityTreeMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTreeMakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTreeMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
