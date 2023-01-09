import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAttachmentPaginateComponent } from './test-attachment-paginate.component';

describe('TestAttachmentPaginateComponent', () => {
	let component: TestAttachmentPaginateComponent;
	let fixture: ComponentFixture<TestAttachmentPaginateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestAttachmentPaginateComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestAttachmentPaginateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
