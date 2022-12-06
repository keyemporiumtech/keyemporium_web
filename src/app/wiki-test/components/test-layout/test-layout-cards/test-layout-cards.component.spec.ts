import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLayoutCardsComponent } from './test-layout-cards.component';

describe('TestLayoutCardsComponent', () => {
	let component: TestLayoutCardsComponent;
	let fixture: ComponentFixture<TestLayoutCardsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestLayoutCardsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestLayoutCardsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
