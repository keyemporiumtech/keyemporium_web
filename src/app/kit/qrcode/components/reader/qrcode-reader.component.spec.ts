import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeReaderComponent } from './qrcode-reader.component';

describe('QrcodeReaderComponent', () => {
	let component: QrcodeReaderComponent;
	let fixture: ComponentFixture<QrcodeReaderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [QrcodeReaderComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(QrcodeReaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
