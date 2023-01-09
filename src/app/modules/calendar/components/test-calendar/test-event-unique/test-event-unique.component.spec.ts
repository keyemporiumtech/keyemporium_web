import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEventUniqueComponent } from './test-event-unique.component';

describe('TestEventUniqueComponent', () => {
	let component: TestEventUniqueComponent;
	let fixture: ComponentFixture<TestEventUniqueComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestEventUniqueComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestEventUniqueComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
