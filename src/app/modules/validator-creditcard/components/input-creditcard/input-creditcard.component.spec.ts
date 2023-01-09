import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCreditcardComponent } from './input-creditcard.component';

describe('InputCreditcardComponent', () => {
	let component: InputCreditcardComponent;
	let fixture: ComponentFixture<InputCreditcardComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [InputCreditcardComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InputCreditcardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
