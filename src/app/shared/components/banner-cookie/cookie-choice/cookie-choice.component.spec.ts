import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieChoiceComponent } from './cookie-choice.component';

describe('CookieChoiceComponent', () => {
	let component: CookieChoiceComponent;
	let fixture: ComponentFixture<CookieChoiceComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CookieChoiceComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CookieChoiceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
