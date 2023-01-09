import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResourcesComponent } from './test-resources.component';

describe('TestResourcesComponent', () => {
	let component: TestResourcesComponent;
	let fixture: ComponentFixture<TestResourcesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestResourcesComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestResourcesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
