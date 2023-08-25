import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestA2FAComponent } from './test-a2fa.component';

describe('TestA2FAComponent', () => {
	let component: TestA2FAComponent;
	let fixture: ComponentFixture<TestA2FAComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestA2FAComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestA2FAComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
