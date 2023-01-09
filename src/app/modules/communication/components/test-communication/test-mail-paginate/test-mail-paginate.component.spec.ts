import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMailPaginateComponent } from './test-mail-paginate.component';

describe('TestMailPaginateComponent', () => {
	let component: TestMailPaginateComponent;
	let fixture: ComponentFixture<TestMailPaginateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestMailPaginateComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestMailPaginateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
