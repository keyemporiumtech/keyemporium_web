import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { QRCodeModule } from 'angularx-qrcode';
import { QrcodeReaderComponent } from './components/reader/qrcode-reader.component';
import { QrcodeScannerComponent } from './components/scanner/qrcode-scanner.component';

@NgModule({
	declarations: [QrcodeReaderComponent, QrcodeScannerComponent],
	imports: [CommonModule, NgQrScannerModule, QRCodeModule],
	exports: [QrcodeReaderComponent, QrcodeScannerComponent],
})
export class QrcodeModule {
	static forRoot() {
		return {
			ngModule: QrcodeModule,
			providers: [],
		};
	}
}
