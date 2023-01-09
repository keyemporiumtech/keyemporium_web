import {
	Component,
	EventEmitter,
	Input,
	Output,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent } from '../../../abstract/base.component';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';

/**
 * @see : https://github.com/zxing-js/ngx-scanner/wiki
 */
@Component({
	selector: 'ddc-init-qrcode-scanner',
	templateUrl: './qrcode-scanner.component.html',
	styleUrls: ['./qrcode-scanner.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class QrcodeScannerComponent extends BaseComponent {
	@Output() textEmit: EventEmitter<string> = new EventEmitter<string>();
	@Input() flgText: boolean;
	scannerEnabled: boolean = true;
	information: string = '';

	availableDevices: MediaDeviceInfo[];
	currentDevice: MediaDeviceInfo = null;

	formatsEnabled: BarcodeFormat[] = [
		BarcodeFormat.CODE_128,
		BarcodeFormat.DATA_MATRIX,
		BarcodeFormat.EAN_13,
		BarcodeFormat.QR_CODE,
	];

	hasDevices: boolean;
	hasPermission: boolean;

	qrResultString: string;

	torchEnabled = false;
	torchAvailable$ = new BehaviorSubject<boolean>(false);
	tryHarder = false;

	@ViewChild('scanner', { static: false }) scanner: ZXingScannerComponent;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.flgText = true;
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}

	clearResult(): void {
		this.qrResultString = '';
		this.textEmit.emit(this.qrResultString);
	}

	onCamerasFound(devices: MediaDeviceInfo[]): void {
		this.availableDevices = devices;
		this.hasDevices = Boolean(devices && devices.length);
	}

	onCodeResult(resultString: string) {
		this.qrResultString = resultString;
		this.textEmit.emit(this.qrResultString);
	}

	onDeviceSelectChange(selected: string) {
		const device = this.availableDevices.find((x) => x.deviceId === selected);
		this.currentDevice = device || null;
	}

	onHasPermission(has: boolean) {
		this.hasPermission = has;
	}

	onTorchCompatible(isCompatible: boolean): void {
		this.torchAvailable$.next(isCompatible || false);
	}

	toggleTorch(): void {
		this.torchEnabled = !this.torchEnabled;
	}

	toggleTryHarder(): void {
		this.tryHarder = !this.tryHarder;
	}

	// device
	start() {
		this.scannerEnabled = true;
		this.qrResultString = '';
		this.textEmit.emit(this.qrResultString);
	}
	stop() {
		this.scannerEnabled = false;
		this.qrResultString = '';
		this.textEmit.emit(this.qrResultString);
	}

	getClassName(): string {
		return 'ScannerComponent';
	}
}
