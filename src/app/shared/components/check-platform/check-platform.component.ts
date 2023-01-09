import { Component, Input } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { environment } from '../../../../environments/environment';
import { BaseComponent, ApplicationLoggerService } from '@ddc/kit';

@Component({
	selector: 'ddc-init-check-platform',
	templateUrl: './check-platform.component.html',
	styleUrls: ['./check-platform.component.scss'],
})
export class CheckPlatformComponent extends BaseComponent {
	@Input() autoRedirect: boolean;
	deviceInfo: DeviceInfo;
	urlRedirect;
	message: string;
	constructor(
		applicationLogger: ApplicationLoggerService,
		private deviceService: DeviceDetectorService,
	) {
		super(applicationLogger);
		this.epicFunction();
	}

	ngOnInitForChildren() {
		this.check();
	}
	ngOnDestroyForChildren() {}
	ngAfterViewInitForChildren() {}
	getClassName() {
		return 'CheckPlatformComponent';
	}

	epicFunction() {
		this.deviceInfo = this.deviceService.getDeviceInfo();
		const isMobile = this.deviceService.isMobile();
		const isTablet = this.deviceService.isTablet();
		const isDesktopDevice = this.deviceService.isDesktop();
		this.log.debug('DEVICE', this.deviceInfo);
		this.log.debug('isMobile', isMobile); // returns if the device is a mobile device (android / iPhone / windows-phone etc)
		this.log.debug('isTablet', isTablet); // returns if the device us a tablet (iPad etc)
		this.log.debug('isDesktopDevice', isDesktopDevice); // returns if the app is running on a Desktop browser.
	}

	check() {
		if (this.deviceService.isMobile()) {
			this.urlRedirect = environment.api.mobile;
			this.message = 'APP.PLATFORM.MESSAGE_IS_MOBILE';
		}
		if (this.urlRedirect && this.autoRedirect) {
			this.go();
		}
	}

	go() {
		window.location.href = this.urlRedirect;
	}
}
