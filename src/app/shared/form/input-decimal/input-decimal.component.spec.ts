import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDecimalComponent } from './input-decimal.component';

describe('InputDecimalComponent', () => {
	let component: InputDecimalComponent;
	let fixture: ComponentFixture<InputDecimalComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [InputDecimalComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InputDecimalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
