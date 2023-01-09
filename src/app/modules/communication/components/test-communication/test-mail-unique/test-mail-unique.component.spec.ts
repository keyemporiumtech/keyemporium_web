import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMailUniqueComponent } from './test-mail-unique.component';

describe('TestMailUniqueComponent', () => {
	let component: TestMailUniqueComponent;
	let fixture: ComponentFixture<TestMailUniqueComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestMailUniqueComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestMailUniqueComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
