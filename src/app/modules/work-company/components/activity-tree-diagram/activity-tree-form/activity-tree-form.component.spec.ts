import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTreeFormComponent } from './activity-tree-form.component';

describe('ActivityTreeFormComponent', () => {
  let component: ActivityTreeFormComponent;
  let fixture: ComponentFixture<ActivityTreeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTreeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTreeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
