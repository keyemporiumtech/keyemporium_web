import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListEmailsComponent } from './profile-list-emails.component';

describe('ProfileListEmailsComponent', () => {
	let component: ProfileListEmailsComponent;
	let fixture: ComponentFixture<ProfileListEmailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProfileListEmailsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProfileListEmailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
