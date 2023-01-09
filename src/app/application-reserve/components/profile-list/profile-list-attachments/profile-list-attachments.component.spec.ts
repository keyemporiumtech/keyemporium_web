import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListAttachmentsComponent } from './profile-list-attachments.component';

describe('ProfileListAttachmentsComponent', () => {
	let component: ProfileListAttachmentsComponent;
	let fixture: ComponentFixture<ProfileListAttachmentsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProfileListAttachmentsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProfileListAttachmentsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
