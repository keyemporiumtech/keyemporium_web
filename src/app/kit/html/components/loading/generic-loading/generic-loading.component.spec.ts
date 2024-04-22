import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericLoadingComponent } from './generic-loading.component';

describe('GenericLoadingComponent', () => {
	let component: GenericLoadingComponent;
	let fixture: ComponentFixture<GenericLoadingComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GenericLoadingComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GenericLoadingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
