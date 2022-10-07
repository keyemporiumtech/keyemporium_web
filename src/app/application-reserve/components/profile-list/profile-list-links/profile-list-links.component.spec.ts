import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListLinksComponent } from './profile-list-links.component';

describe('ProfileListLinksComponent', () => {
  let component: ProfileListLinksComponent;
  let fixture: ComponentFixture<ProfileListLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileListLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileListLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
