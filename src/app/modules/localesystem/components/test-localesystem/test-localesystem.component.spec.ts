import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLocalesystemComponent } from './test-localesystem.component';

describe('TestLocalesystemComponent', () => {
	let component: TestLocalesystemComponent;
	let fixture: ComponentFixture<TestLocalesystemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestLocalesystemComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestLocalesystemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
