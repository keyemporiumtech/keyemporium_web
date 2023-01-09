import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingHourglassComponent } from './loading-hourglass.component';

describe('LoadingHourglassComponent', () => {
	let component: LoadingHourglassComponent;
	let fixture: ComponentFixture<LoadingHourglassComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LoadingHourglassComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoadingHourglassComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
