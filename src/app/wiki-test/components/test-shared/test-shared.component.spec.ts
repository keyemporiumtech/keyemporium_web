import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSharedComponent } from './test-shared.component';

describe('TestSharedComponent', () => {
	let component: TestSharedComponent;
	let fixture: ComponentFixture<TestSharedComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestSharedComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestSharedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
