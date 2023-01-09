import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMimetypePaginateComponent } from './test-mimetype-paginate.component';

describe('TestMimetypePaginateComponent', () => {
	let component: TestMimetypePaginateComponent;
	let fixture: ComponentFixture<TestMimetypePaginateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestMimetypePaginateComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestMimetypePaginateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
