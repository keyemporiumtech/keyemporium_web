import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {
	BaseComponent,
	ApplicationLoggerService,
	StringTranslate,
	ApplicationStorageService,
	FileEmbedModel,
	EnumBannerPosition,
	BannerComponent,
} from '@ddc/kit';
import { Router } from '@angular/router';
import { template } from '../../../../environments/template/template';
import { component } from '../../../../environments/template/component';
declare var $: any;

@Component({
	selector: 'ddc-init-banner-cookie',
	templateUrl: './banner-cookie.component.html',
	styleUrls: ['./banner-cookie.component.scss'],
})
export class BannerCookieComponent extends BaseComponent {
	EnumBannerPosition = EnumBannerPosition;
	@ViewChild('bannerCookie') bannerCookie: BannerComponent;
	// inputs
	@Input() position: EnumBannerPosition = EnumBannerPosition.BOTTOM;
	// close
	@Input() flgClose: boolean;
	@Input() closeIcon: string;
	// text
	@Input() text: string | StringTranslate;
	// operations
	@Input() flgLoad: boolean = true;
	@Input() delayLoad: number;
	@Input() fadeIn: number;
	@Input() fadeOut: number;
	// cookie style
	@Input() backgroundColor: any;
	@Input() textColor: any;
	@Input() moreInfoClass: any;
	@Input() moreInfoStyle: any;
	@Input() acceptClass: any;
	@Input() acceptStyle: any;
	// emitters
	@Output() emitLoad: EventEmitter<string> = new EventEmitter<string>();
	@Output() emitClose: EventEmitter<string> = new EventEmitter<string>();
	@Output() emitMoreInfo: EventEmitter<string> = new EventEmitter<string>();
	@Output() emitAccept: EventEmitter<string> = new EventEmitter<string>();

	constructor(
		applicationLogger: ApplicationLoggerService,
		private applicationStorage: ApplicationStorageService,
		private router: Router,
	) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		// defaults
		if (this.text) {
			this.flgClose = true;
		}
		if (!this.closeIcon) {
			this.closeIcon = template.icons.genericClose;
		}
		if (!this.moreInfoClass) {
			this.moreInfoClass = component.cookie.moreInfoClass;
		}
		if (!this.acceptClass) {
			this.acceptClass = component.cookie.acceptClass;
		}
		if (!this.backgroundColor) {
			this.backgroundColor = component.cookie.backgroundColor;
		}
		if (!this.textColor) {
			this.textColor = component.cookie.textColor;
		}
		if (!this.delayLoad) {
			this.delayLoad = component.cookie.delay;
		}
		if (!this.fadeIn) {
			this.fadeIn = component.cookie.fadeIn;
		}
		if (!this.fadeOut) {
			this.fadeOut = component.cookie.fadeOut;
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'BannerCookieComponent';
	}

	// functions
	onOpen() {
		this.applicationStorage.bannerStatus.del();
		const storageVariable: string = this.applicationStorage.bannerStatus.get();
		if (!storageVariable) {
			this.emitLoad.emit('cookiePolicy' + this.id);
		}
	}

	onClose() {
		this.emitClose.emit('cookiePolicy' + this.id);
		this.applicationStorage.bannerStatus.set('cookiePolicy' + this.id);
	}

	moreInfo() {
		this.emitMoreInfo.emit('cookiePolicy' + this.id);
		const fileEmbed = this.applicationStorage.cookiePolicyResource.getObj() as FileEmbedModel;
		fileEmbed.back = this.router.url;
		this.applicationStorage.fileEmbed.setObj(fileEmbed);
		this.router.navigate(['commons', 'file', 1]);
	}

	accept() {
		this.bannerCookie.close();
	}
}
