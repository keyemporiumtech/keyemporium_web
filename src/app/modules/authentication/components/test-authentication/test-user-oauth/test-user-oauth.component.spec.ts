import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUserOauthComponent } from './test-user-oauth.component';

describe('TestUserOauthComponent', () => {
	let component: TestUserOauthComponent;
	let fixture: ComponentFixture<TestUserOauthComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestUserOauthComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestUserOauthComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
