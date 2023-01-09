import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitRoutingComponent } from './test-kit-routing.component';

describe('TestKitRoutingComponent', () => {
	let component: TestKitRoutingComponent;
	let fixture: ComponentFixture<TestKitRoutingComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestKitRoutingComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestKitRoutingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
