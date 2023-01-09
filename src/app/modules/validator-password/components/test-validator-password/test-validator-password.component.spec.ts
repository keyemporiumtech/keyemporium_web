import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestValidatorIbanComponent } from './test-validator-iban.component';

describe('TestValidatorIbanComponent', () => {
	let component: TestValidatorIbanComponent;
	let fixture: ComponentFixture<TestValidatorIbanComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestValidatorIbanComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestValidatorIbanComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
