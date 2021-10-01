import { Component } from '@angular/core';
import { BaseLoadingModel } from '../models/base-loading.model';
import { ApplicationLoggerService } from '../../../../logger/services/application-logger.service';
declare var $: any;

@Component({
	selector: 'ddc-init-loading-dual-ring',
	templateUrl: './loading-dual-ring.component.html',
	styleUrls: ['./loading-dual-ring.component.scss'],
})
export class LoadingDualRingComponent extends BaseLoadingModel {
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	selectors(): any[] {
		const array: any[] = [];
		array.push(document.querySelector('.lds-dual-ring'));
		return array;
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'LoadingDualRingComponent';
	}
}
