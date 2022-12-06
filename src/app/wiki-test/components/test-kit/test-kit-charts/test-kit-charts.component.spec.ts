import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitChartsComponent } from './test-kit-charts.component';

describe('TestKitChartsComponent', () => {
	let component: TestKitChartsComponent;
	let fixture: ComponentFixture<TestKitChartsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestKitChartsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestKitChartsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
