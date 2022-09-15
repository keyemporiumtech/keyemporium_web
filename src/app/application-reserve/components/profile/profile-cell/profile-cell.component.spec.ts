import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCellComponent } from './profile-cell.component';

describe('ProfileCellComponent', () => {
  let component: ProfileCellComponent;
  let fixture: ComponentFixture<ProfileCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
