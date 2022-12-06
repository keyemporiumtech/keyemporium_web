import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestApiPaginateComponent } from './test-api-paginate.component';

describe('TestApiPaginateComponent', () => {
	let component: TestApiPaginateComponent;
	let fixture: ComponentFixture<TestApiPaginateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestApiPaginateComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestApiPaginateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
