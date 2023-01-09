import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCommunicationComponent } from './test-communication.component';

describe('TestCommunicationComponent', () => {
	let component: TestCommunicationComponent;
	let fixture: ComponentFixture<TestCommunicationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestCommunicationComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestCommunicationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
