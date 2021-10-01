import { Component, Input, ViewChild } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { BaseComponent } from '../../../abstract/base.component';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';

@Component({
	selector: 'ddc-init-qrcode-reader',
	templateUrl: './qrcode-reader.component.html',
	styleUrls: ['./qrcode-reader.component.scss'],
})
export class QrcodeReaderComponent extends BaseComponent {
	@Input() id: any;
	@Input() allowEmptyString: boolean = false; // 	Allow empty string
	@Input() colorlight: string = '#ffffff'; // 	Light color
	@Input() colordark: string = '#000000'; // 	Dark Color
	@Input() level: 'L' | 'M' | 'Q' | 'H' = 'M'; // QR Correction level ('L', 'M', 'Q', 'H')
	@Input() text: string = ''; // 	String to encode
	@Input() size: number = 256; // Height/Width (any value)
	@Input() usesvg: boolean = false; // 	SVG Output
	@ViewChild('qrcoderef') qrcoderef: QRCodeComponent;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	readBlob(): string {
		const html = this.qrcoderef.el.nativeElement.innerHTML;
		return html.substr(0, html.length - 2).split('base64,')[1];
	}

	readImageContent(): string {
		return 'data:image/png;base64,' + this.readBlob();
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'ReaderComponent';
	}
}
