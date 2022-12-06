import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListAddressesComponent } from './profile-list-addresses.component';

describe('ProfileListAddressesComponent', () => {
	let component: ProfileListAddressesComponent;
	let fixture: ComponentFixture<ProfileListAddressesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProfileListAddressesComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProfileListAddressesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
