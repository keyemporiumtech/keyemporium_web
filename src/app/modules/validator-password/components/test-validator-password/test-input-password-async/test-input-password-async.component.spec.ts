import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputPasswordAsyncComponent } from './test-input-password-async.component';

describe('TestInputPasswordAsyncComponent', () => {
	let component: TestInputPasswordAsyncComponent;
	let fixture: ComponentFixture<TestInputPasswordAsyncComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestInputPasswordAsyncComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestInputPasswordAsyncComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
