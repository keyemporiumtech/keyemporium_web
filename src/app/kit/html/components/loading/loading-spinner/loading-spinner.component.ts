import { Component } from '@angular/core';
import { BaseLoadingModel } from '../models/base-loading.model';
import { ApplicationLoggerService } from '../../../../logger/services/application-logger.service';

@Component({
	selector: 'ddc-init-loading-spinner',
	templateUrl: './loading-spinner.component.html',
	styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent extends BaseLoadingModel {
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	selectors(): any[] {
		const array: any[] = [];
		const spinner = document.querySelector('.lds-spinner');
		const numElements = spinner.querySelectorAll('div').length;
		for (let i = 0; i < numElements; i++) {
			array.push(spinner.querySelectorAll('div')[i]);
		}

		return array;
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'LoadingSpinnerComponent';
	}
}
