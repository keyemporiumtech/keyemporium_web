import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitValidatorsComponent } from './test-kit-validators.component';

describe('TestKitValidatorsComponent', () => {
	let component: TestKitValidatorsComponent;
	let fixture: ComponentFixture<TestKitValidatorsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestKitValidatorsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestKitValidatorsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
