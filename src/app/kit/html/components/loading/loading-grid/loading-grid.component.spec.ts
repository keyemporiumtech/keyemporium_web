import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingGridComponent } from './loading-grid.component';

describe('LoadingGridComponent', () => {
	let component: LoadingGridComponent;
	let fixture: ComponentFixture<LoadingGridComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LoadingGridComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoadingGridComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
