import { Component, ViewChild, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, Subscription, interval, BehaviorSubject } from 'rxjs';
import { BaseComponent } from '../../../abstract/base.component';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';

@Component({
	selector: 'ddc-init-qrcode-scanner',
	templateUrl: './qrcode-scanner.component.html',
	styleUrls: ['./qrcode-scanner.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class QrcodeScannerComponent extends BaseComponent {
	@Input() id: any;
	@Input() debug: boolean = false;
	@Input() width: number = 640; // 640 (default) - 1080
	@Input() height: number = 640; // 480 (default) - 720
	@Input() stopAfterScan: boolean = false; // should the scanner stop after first success? (default: true)
	@Input() updateTime: number = 500; // miliseconds between new capture (default: 500)

	@ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent;

	listenerCapture: Subscription;
	subQrcode: Subscription;
	private _textQrcode: string;
	private _device: any;

	textChange: BehaviorSubject<string> = new BehaviorSubject<string>('');
	textReaded: Observable<string> = this.textChange.asObservable();

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		this.qrScannerComponent.getMediaDevices().then((devices) => {
			this.log.info('Devices', devices);
			const videoDevices: MediaDeviceInfo[] = [];
			for (const device of devices) {
				if (device.kind.toString() === 'videoinput') {
					videoDevices.push(device);
				}
			}
			if (videoDevices.length > 0) {
				let choosenDev;
				for (const dev of videoDevices) {
					if (dev.label.includes('front')) {
						choosenDev = dev;
						break;
					}
				}
				if (choosenDev) {
					this.qrScannerComponent.chooseCamera.next(choosenDev);
					this.device = choosenDev;
				} else {
					this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
					this.device = videoDevices[0];
				}
			}
		});

		this.subQrcode = this.qrScannerComponent.capturedQr.subscribe((res) => {
			this.log.info('Text captured from subscribe', res);
			this.textQrcode = res;
			this.textChange.next(res);
		});
	}
	ngAfterViewInitForChildren() {}

	// device
	start() {
		this.qrScannerComponent.startScanning(this.device);
	}
	stop() {
		this.qrScannerComponent.stopScanning();
	}
	// utility
	scan() {
		this.listenerCapture = interval(this.updateTime)
			.pipe(
				startWith(0),
				switchMap(() => this.qrScannerComponent.capturedQr.asObservable()),
			)
			.subscribe((res) => {
				if (res) {
					this.textQrcode = res;
				}
			});
	}
	getListenerText(): Observable<string> {
		return this.qrScannerComponent.capturedQr.pipe(
			map((result) => {
				this.log.info('Text captured', result);
				return result;
			}),
		);
	}
	ngOnDestroyForChildren() {
		if (this.listenerCapture) {
			this.listenerCapture.unsubscribe();
		}
		if (this.subQrcode) {
			this.subQrcode.unsubscribe();
		}
	}

	getClassName(): string {
		return 'ScannerComponent';
	}

	/**
	 * Getter textQrcode
	 * @return string
	 */
	public get textQrcode(): string {
		return this._textQrcode;
	}

	/**
	 * Setter textQrcode
	 * @param string value
	 */
	public set textQrcode(value: string) {
		this._textQrcode = value;
	}

	/**
	 * Getter device
	 * @return any
	 */
	public get device(): any {
		return this._device;
	}

	/**
	 * Setter device
	 * @param any value
	 */
	public set device(value: any) {
		this._device = value;
	}
}
