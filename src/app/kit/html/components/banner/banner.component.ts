import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from '../../../abstract/base.component';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';
import { StringTranslate } from '../../../translation/models/string-translate.model';
import { EnumBannerPosition } from '../../enums/banner-position.enum';
declare var $: any;

@Component({
	selector: 'ddc-init-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.scss'],
})
export class BannerComponent extends BaseComponent {
	@Input() bannerStyle: any;
	@Input() bannerClass: any;
	@Input() backgroundColor: string = '#000';
	@Input() width: string = '2rem'; // if text
	@Input() height: string = '2rem'; // if text
	@Input() position: EnumBannerPosition = EnumBannerPosition.BOTTOM;
	// close
	@Input() flgClose: boolean;
	@Input() closeStyle: any;
	@Input() closeClass: any;
	@Input() closeIcon: string = 'fa fa-times';
	// text
	@Input() textStyle: any;
	@Input() textClass: any;
	@Input() text: string | StringTranslate;
	@Input() textColor: string = '#fff';
	// operations
	@Input() flgLoad: boolean = true;
	@Input() delayLoad: number = 4000;
	@Input() fadeIn: number = 200;
	@Input() fadeOut: number = 200;
	@Output() closeEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() openEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() bannerClickEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		if (!this.bannerStyle) {
			this.bannerStyle = {};
		}
		if (!this.flgClose) {
			this.flgClose = true;
		}
		if (!this.textStyle) {
			this.textStyle = {};
		}
		this.buildBannerStyle();
		if (this.flgLoad) {
			setTimeout(() => {
				this.open();
			}, this.delayLoad);
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'BannerComponent';
	}

	private buildBannerStyle() {
		if (this.backgroundColor) {
			this.bannerStyle['background-color'] = this.backgroundColor;
		}
		if (this.textColor) {
			this.textStyle.color = this.textColor;
		}
		if (
			(this.position === EnumBannerPosition.TOP || this.position === EnumBannerPosition.BOTTOM) &&
			this.height
		) {
			this.bannerStyle['min-height'] = this.height;
			this.bannerStyle['line-height'] = this.height;
			this.bannerStyle['left'] = 0;
			this.bannerStyle['right'] = 0;
		}
		if (
			(this.position === EnumBannerPosition.RIGHT || this.position === EnumBannerPosition.LEFT) &&
			this.width
		) {
			this.bannerStyle['min-width'] = this.width;
			this.bannerStyle['top'] = 0;
			this.bannerStyle['bottom'] = 0;
			this.textStyle['margin-top'] = '2rem';
		}
		if (this.position === EnumBannerPosition.TOP) {
			this.bannerStyle['top'] = 0;
		} else if (this.position === EnumBannerPosition.BOTTOM) {
			this.bannerStyle['bottom'] = 0;
		} else if (this.position === EnumBannerPosition.RIGHT) {
			this.bannerStyle['right'] = 0;
		} else if (this.position === EnumBannerPosition.LEFT) {
			this.bannerStyle['left'] = 0;
		}
	}

	// Operations
	open() {
		$('#' + this.id).fadeIn(this.fadeIn);
		this.openEmit.emit(true);
	}
	close() {
		$('#' + this.id).fadeOut(this.fadeOut);
		this.closeEmit.emit(true);
	}
	bannerClick() {
		this.bannerClickEmit.emit(true);
	}
}
