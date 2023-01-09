import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { QrcodeReaderComponent } from './components/reader/qrcode-reader.component';
import { QrcodeScannerComponent } from './components/scanner/qrcode-scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
	declarations: [QrcodeReaderComponent, QrcodeScannerComponent],
	imports: [CommonModule, QRCodeModule, ZXingScannerModule],
	exports: [QrcodeReaderComponent, QrcodeScannerComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class QrcodeModule {
	static forRoot() {
		return {
			ngModule: QrcodeModule,
			providers: [],
		};
	}
}
