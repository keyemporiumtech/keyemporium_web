import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingFbComponent } from './loading-fb.component';

describe('LoadingFbComponent', () => {
	let component: LoadingFbComponent;
	let fixture: ComponentFixture<LoadingFbComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LoadingFbComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoadingFbComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
