import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLayoutButtonsComponent } from './test-layout-buttons.component';

describe('TestLayoutButtonsComponent', () => {
	let component: TestLayoutButtonsComponent;
	let fixture: ComponentFixture<TestLayoutButtonsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestLayoutButtonsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestLayoutButtonsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
