import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEventPaginateComponent } from './test-event-paginate.component';

describe('TestEventPaginateComponent', () => {
	let component: TestEventPaginateComponent;
	let fixture: ComponentFixture<TestEventPaginateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestEventPaginateComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestEventPaginateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
