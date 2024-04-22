import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseLoadingModel } from '../models/base-loading.model';
import { ApplicationLoggerService } from '../../../../logger/services/application-logger.service';

@Component({
	selector: 'ddc-init-loading-hourglass',
	templateUrl: './loading-hourglass.component.html',
	styleUrls: ['./loading-hourglass.component.scss'],
})
export class LoadingHourglassComponent extends BaseLoadingModel {
	@ViewChild('el') el: ElementRef;
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	setSelectors(): void {
		// array.push(document.querySelector('.lds-hourglass'));
		this.selectorsLoading.length = 0;
		this.selectorsLoading.push(this.el.nativeElement);
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'LoadingHourglassComponent';
	}
}
