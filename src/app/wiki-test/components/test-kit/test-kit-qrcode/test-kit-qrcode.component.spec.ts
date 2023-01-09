import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitQrcodeComponent } from './test-kit-qrcode.component';

describe('TestKitQrcodeComponent', () => {
	let component: TestKitQrcodeComponent;
	let fixture: ComponentFixture<TestKitQrcodeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TestKitQrcodeComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TestKitQrcodeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
