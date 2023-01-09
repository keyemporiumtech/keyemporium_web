import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAttachmentUniqueComponent } from './test-attachment-unique.component';

describe('TestAttachmentUniqueComponent', () => {
	let component: TestAttachmentUniqueComponent;
	let fixture: ComponentFixture<TestAttachmentUniqueComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestAttachmentUniqueComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestAttachmentUniqueComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
