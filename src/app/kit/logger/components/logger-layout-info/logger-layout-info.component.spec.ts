import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerLayoutInfoComponent } from './logger-layout-info.component';

describe('LoggerLayoutInfoComponent', () => {
	let component: LoggerLayoutInfoComponent;
	let fixture: ComponentFixture<LoggerLayoutInfoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LoggerLayoutInfoComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoggerLayoutInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
