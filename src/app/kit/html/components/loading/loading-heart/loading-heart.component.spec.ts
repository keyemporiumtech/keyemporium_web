import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingHeartComponent } from './loading-heart.component';

describe('LoadingHeartComponent', () => {
	let component: LoadingHeartComponent;
	let fixture: ComponentFixture<LoadingHeartComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LoadingHeartComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoadingHeartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
