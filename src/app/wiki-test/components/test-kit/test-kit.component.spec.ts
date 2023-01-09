import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitComponent } from './test-kit.component';

describe('TestKitComponent', () => {
	let component: TestKitComponent;
	let fixture: ComponentFixture<TestKitComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestKitComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestKitComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
