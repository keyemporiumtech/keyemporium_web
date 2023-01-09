import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLayoutAlertsComponent } from './test-layout-alerts.component';

describe('TestLayoutAlertsComponent', () => {
	let component: TestLayoutAlertsComponent;
	let fixture: ComponentFixture<TestLayoutAlertsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestLayoutAlertsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestLayoutAlertsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
