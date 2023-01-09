import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingRollerComponent } from './loading-roller.component';

describe('LoadingRollerComponent', () => {
	let component: LoadingRollerComponent;
	let fixture: ComponentFixture<LoadingRollerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LoadingRollerComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoadingRollerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
