import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCommonsPageMessageComponent } from './test-commons-page-message.component';

describe('TestCommonsPageMessageComponent', () => {
	let component: TestCommonsPageMessageComponent;
	let fixture: ComponentFixture<TestCommonsPageMessageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestCommonsPageMessageComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestCommonsPageMessageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
