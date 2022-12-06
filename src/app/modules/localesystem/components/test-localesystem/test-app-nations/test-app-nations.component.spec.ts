import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAppNationsComponent } from './test-app-nations.component';

describe('TestAppNationsComponent', () => {
	let component: TestAppNationsComponent;
	let fixture: ComponentFixture<TestAppNationsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestAppNationsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestAppNationsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
