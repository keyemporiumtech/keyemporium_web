import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingEllipsisComponent } from './loading-ellipsis.component';

describe('LoadingEllipsisComponent', () => {
	let component: LoadingEllipsisComponent;
	let fixture: ComponentFixture<LoadingEllipsisComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LoadingEllipsisComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoadingEllipsisComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
