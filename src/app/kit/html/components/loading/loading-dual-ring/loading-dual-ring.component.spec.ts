import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDualRingComponent } from './loading-dual-ring.component';

describe('LoadingDualRingComponent', () => {
	let component: LoadingDualRingComponent;
	let fixture: ComponentFixture<LoadingDualRingComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LoadingDualRingComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoadingDualRingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
