import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTreeMkFormComponent } from './activity-tree-mk-form.component';

describe('ActivityTreeMkFormComponent', () => {
  let component: ActivityTreeMkFormComponent;
  let fixture: ComponentFixture<ActivityTreeMkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTreeMkFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTreeMkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
