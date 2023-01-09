import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDefaultComponent } from './loading-default.component';

describe('LoadingDefaultComponent', () => {
	let component: LoadingDefaultComponent;
	let fixture: ComponentFixture<LoadingDefaultComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LoadingDefaultComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoadingDefaultComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
