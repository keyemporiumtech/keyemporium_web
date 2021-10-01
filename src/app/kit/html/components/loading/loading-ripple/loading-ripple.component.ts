import { Component } from '@angular/core';
import { BaseLoadingModel } from '../models/base-loading.model';
import { ApplicationLoggerService } from '../../../../logger/services/application-logger.service';

@Component({
	selector: 'ddc-init-loading-ripple',
	templateUrl: './loading-ripple.component.html',
	styleUrls: ['./loading-ripple.component.scss'],
})
export class LoadingRippleComponent extends BaseLoadingModel {
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	selectors(): any[] {
		const array: any[] = [];
		array.push(document.querySelector('.lds-ripple div'));
		return array;
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'LoadingRippleComponent';
	}
}
