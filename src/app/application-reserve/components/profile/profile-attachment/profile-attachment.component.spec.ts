import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAttachmentComponent } from './profile-attachment.component';

describe('ProfileAttachmentComponent', () => {
  let component: ProfileAttachmentComponent;
  let fixture: ComponentFixture<ProfileAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
