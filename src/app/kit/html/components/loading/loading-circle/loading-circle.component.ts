import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseLoadingModel } from '../models/base-loading.model';
import { ApplicationLoggerService } from '../../../../logger/services/application-logger.service';

@Component({
	selector: 'ddc-init-loading-circle',
	templateUrl: './loading-circle.component.html',
	styleUrls: ['./loading-circle.component.scss'],
})
export class LoadingCircleComponent extends BaseLoadingModel {
	@ViewChild('el') el: ElementRef;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	setSelectors(): void {
		this.selectorsLoading.length = 0;
		// array.push(document.querySelector('.lds-circle > div')); work only for one
		const element = this.el.nativeElement;
		this.selectorsLoading.push(element.querySelector('div'));
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'LoadingCircleComponent';
	}
}
