import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListImagesComponent } from './profile-list-images.component';

describe('ProfileListImagesComponent', () => {
	let component: ProfileListImagesComponent;
	let fixture: ComponentFixture<ProfileListImagesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProfileListImagesComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProfileListImagesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
