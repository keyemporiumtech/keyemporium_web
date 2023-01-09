import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderReserveComponent } from './header-reserve.component';

describe('HeaderReserveComponent', () => {
	let component: HeaderReserveComponent;
	let fixture: ComponentFixture<HeaderReserveComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [HeaderReserveComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderReserveComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
