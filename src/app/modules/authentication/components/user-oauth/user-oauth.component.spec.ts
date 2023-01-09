import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOauthComponent } from './user-oauth.component';

describe('UserOauthComponent', () => {
	let component: UserOauthComponent;
	let fixture: ComponentFixture<UserOauthComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserOauthComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserOauthComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
