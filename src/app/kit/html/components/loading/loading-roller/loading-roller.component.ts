import { Component } from '@angular/core';
import { BaseLoadingModel } from '../models/base-loading.model';
import { ApplicationLoggerService } from '../../../../logger/services/application-logger.service';

@Component({
	selector: 'ddc-init-loading-roller',
	templateUrl: './loading-roller.component.html',
	styleUrls: ['./loading-roller.component.scss'],
})
export class LoadingRollerComponent extends BaseLoadingModel {
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	selectors(): any[] {
		const array: any[] = [];
		array.push(document.querySelector('.lds-roller div'));
		return array;
	}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'LoadingRollerComponent';
	}
}
