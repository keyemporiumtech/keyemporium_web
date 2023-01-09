import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputReferenceComponent } from './test-input-reference.component';

describe('TestInputReferenceComponent', () => {
	let component: TestInputReferenceComponent;
	let fixture: ComponentFixture<TestInputReferenceComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestInputReferenceComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestInputReferenceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
