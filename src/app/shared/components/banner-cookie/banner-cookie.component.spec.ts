import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCookieComponent } from './banner-cookie.component';

describe('BannerCookieComponent', () => {
	let component: BannerCookieComponent;
	let fixture: ComponentFixture<BannerCookieComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BannerCookieComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BannerCookieComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
