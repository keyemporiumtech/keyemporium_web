import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilesDropdownComponent } from './user-profiles-dropdown.component';

describe('UserProfilesDropdownComponent', () => {
  let component: UserProfilesDropdownComponent;
  let fixture: ComponentFixture<UserProfilesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfilesDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfilesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
