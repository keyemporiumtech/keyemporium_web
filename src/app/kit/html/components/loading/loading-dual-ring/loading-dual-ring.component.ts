import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseLoadingModel } from '../models/base-loading.model';
import { ApplicationLoggerService } from '../../../../logger/services/application-logger.service';
declare var $: any;

@Component({
	selector: 'ddc-init-loading-dual-ring',
	templateUrl: './loading-dual-ring.component.html',
	styleUrls: ['./loading-dual-ring.component.scss'],
})
export class LoadingDualRingComponent extends BaseLoadingModel {
	@ViewChild('el') el: ElementRef;
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	setSelectors(): void {
		// array.push(document.querySelector('.lds-dual-ring'));
		this.selectorsLoading.length = 0;
		this.selectorsLoading.push(this.el.nativeElement);
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'LoadingDualRingComponent';
	}
}
