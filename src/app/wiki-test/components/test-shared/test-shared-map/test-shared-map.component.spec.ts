import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSharedMapComponent } from './test-shared-map.component';

describe('TestSharedMapComponent', () => {
	let component: TestSharedMapComponent;
	let fixture: ComponentFixture<TestSharedMapComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestSharedMapComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestSharedMapComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
