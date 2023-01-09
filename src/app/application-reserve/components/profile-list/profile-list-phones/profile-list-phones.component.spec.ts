import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListPhonesComponent } from './profile-list-phones.component';

describe('ProfileListPhonesComponent', () => {
	let component: ProfileListPhonesComponent;
	let fixture: ComponentFixture<ProfileListPhonesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProfileListPhonesComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProfileListPhonesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
