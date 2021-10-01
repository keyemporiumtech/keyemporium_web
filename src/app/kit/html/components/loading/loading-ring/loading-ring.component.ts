import { Component } from '@angular/core';
import { BaseLoadingModel } from '../models/base-loading.model';
import { ApplicationLoggerService } from '../../../../logger/services/application-logger.service';

@Component({
	selector: 'ddc-init-loading-ring',
	templateUrl: './loading-ring.component.html',
	styleUrls: ['./loading-ring.component.scss'],
})
export class LoadingRingComponent extends BaseLoadingModel {
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	getStyleDiv(): any {
		const style: any = {};
		style['border'] = '6px solid ' + this.color;
		style['border-color'] = this.color + ' transparent ' + this.color + ' transparent';
		return style;
	}

	selectors(): any[] {
		return [];
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'LoadingRingComponent';
	}
}
