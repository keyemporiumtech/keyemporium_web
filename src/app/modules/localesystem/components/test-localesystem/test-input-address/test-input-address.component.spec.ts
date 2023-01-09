import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputAddressComponent } from './test-input-address.component';

describe('TestInputAddressComponent', () => {
	let component: TestInputAddressComponent;
	let fixture: ComponentFixture<TestInputAddressComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestInputAddressComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestInputAddressComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
