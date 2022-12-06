import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGenericComponent } from './input-generic.component';

describe('InputGenericComponent', () => {
	let component: InputGenericComponent;
	let fixture: ComponentFixture<InputGenericComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [InputGenericComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InputGenericComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
