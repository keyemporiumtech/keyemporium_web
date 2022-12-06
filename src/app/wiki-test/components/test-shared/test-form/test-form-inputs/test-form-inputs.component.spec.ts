import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFormInputsComponent } from './test-form-inputs.component';

describe('TestFormInputsComponent', () => {
	let component: TestFormInputsComponent;
	let fixture: ComponentFixture<TestFormInputsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestFormInputsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestFormInputsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
