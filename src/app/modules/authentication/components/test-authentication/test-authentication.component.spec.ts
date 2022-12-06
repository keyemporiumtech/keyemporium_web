import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAuthenticationComponent } from './test-authentication.component';

describe('TestAuthenticationComponent', () => {
	let component: TestAuthenticationComponent;
	let fixture: ComponentFixture<TestAuthenticationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestAuthenticationComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestAuthenticationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
