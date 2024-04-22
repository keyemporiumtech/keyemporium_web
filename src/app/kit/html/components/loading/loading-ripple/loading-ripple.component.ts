import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseLoadingModel } from '../models/base-loading.model';
import { ApplicationLoggerService } from '../../../../logger/services/application-logger.service';

@Component({
	selector: 'ddc-init-loading-ripple',
	templateUrl: './loading-ripple.component.html',
	styleUrls: ['./loading-ripple.component.scss'],
})
export class LoadingRippleComponent extends BaseLoadingModel {
	@ViewChild('el') el: ElementRef;
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	setSelectors(): void {
		// array.push(document.querySelector('.lds-ripple div'));
		this.selectorsLoading.length = 0;
		const element = this.el.nativeElement;
		this.selectorsLoading.push(element.querySelector('div'));
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'LoadingRippleComponent';
	}
}
