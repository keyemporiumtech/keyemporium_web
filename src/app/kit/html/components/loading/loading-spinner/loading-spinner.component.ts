import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseLoadingModel } from '../models/base-loading.model';
import { ApplicationLoggerService } from '../../../../logger/services/application-logger.service';

@Component({
	selector: 'ddc-init-loading-spinner',
	templateUrl: './loading-spinner.component.html',
	styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent extends BaseLoadingModel {
	@ViewChild('el') el: ElementRef;
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	setSelectors(): void {
		// const spinner = document.querySelector('.lds-spinner');
		this.selectorsLoading.length = 0;
		const spinner = this.el.nativeElement;
		const numElements = spinner.querySelectorAll('div').length;
		for (let i = 0; i < numElements; i++) {
			this.selectorsLoading.push(spinner.querySelectorAll('div')[i]);
		}
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'LoadingSpinnerComponent';
	}
}
