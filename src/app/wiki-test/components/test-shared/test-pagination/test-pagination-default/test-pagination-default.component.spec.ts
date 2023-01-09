import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPaginationDefaultComponent } from './test-pagination-default.component';

describe('TestPaginationDefaultComponent', () => {
	let component: TestPaginationDefaultComponent;
	let fixture: ComponentFixture<TestPaginationDefaultComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestPaginationDefaultComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestPaginationDefaultComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
