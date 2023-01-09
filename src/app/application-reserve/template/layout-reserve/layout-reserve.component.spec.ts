import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutReserveComponent } from './layout-reserve.component';

describe('LayoutReserveComponent', () => {
	let component: LayoutReserveComponent;
	let fixture: ComponentFixture<LayoutReserveComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LayoutReserveComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LayoutReserveComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
