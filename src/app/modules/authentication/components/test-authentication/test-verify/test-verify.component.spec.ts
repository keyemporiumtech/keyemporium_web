import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestVerifyComponent } from './test-verify.component';

describe('TestVerifyComponent', () => {
	let component: TestVerifyComponent;
	let fixture: ComponentFixture<TestVerifyComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestVerifyComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestVerifyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
