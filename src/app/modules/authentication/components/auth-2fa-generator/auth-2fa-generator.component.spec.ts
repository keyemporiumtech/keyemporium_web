import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth2faGeneratorComponent } from './auth-2fa-generator.component';

describe('Auth2faGeneratorComponent', () => {
	let component: Auth2faGeneratorComponent;
	let fixture: ComponentFixture<Auth2faGeneratorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [Auth2faGeneratorComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(Auth2faGeneratorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
