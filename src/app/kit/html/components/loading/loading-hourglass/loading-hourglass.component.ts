import { Component } from '@angular/core';
import { BaseLoadingModel } from '../models/base-loading.model';
import { ApplicationLoggerService } from '../../../../logger/services/application-logger.service';

@Component({
	selector: 'ddc-init-loading-hourglass',
	templateUrl: './loading-hourglass.component.html',
	styleUrls: ['./loading-hourglass.component.scss'],
})
export class LoadingHourglassComponent extends BaseLoadingModel {
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	selectors(): any[] {
		const array: any[] = [];
		array.push(document.querySelector('.lds-hourglass'));
		return array;
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'LoadingHourglassComponent';
	}
}
