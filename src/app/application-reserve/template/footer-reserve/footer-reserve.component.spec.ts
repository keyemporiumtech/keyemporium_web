import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterReserveComponent } from './footer-reserve.component';

describe('FooterReserveComponent', () => {
	let component: FooterReserveComponent;
	let fixture: ComponentFixture<FooterReserveComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FooterReserveComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FooterReserveComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
